// src/components/shared/TransferModal.tsx
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Modal } from "./Modal";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAuth } from "../../hooks/useAuth"; 
import { api } from "../../service/api"; 
import { toast } from "react-hot-toast";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransferModal({ isOpen, onClose }: TransferModalProps) {
  const [cpf, setCpf] = useState("");
  const [amount, setAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const { session, save } = useAuth(); 

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ""); 
    if (value.length <= 11) {
      value = value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
    }

    setCpf(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = event.target.value.replace(/\D/g, "");
    setAmount(Number(cleanValue));
  };

  const formatCurrency = (value: number) => {
    return (value / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handleClose = () => {
    setCpf("");
    setAmount(0);
    onClose();
  };

  const handleConfirmTransfer = async () => {
    const cleanCpf = cpf.replace(/\D/g, "");
    
    if (amount <= 0 || cleanCpf.length !== 11 || !session?.cpf) return;

    try {
      setIsSubmitting(true);

      const valorReal = amount / 100;

      const cleanPayerCpf = session.cpf.replace(/\D/g, "");
      const cleanPayeeCpf = cpf.replace(/\D/g, "");

      const payload = {
        value: valorReal,
        payer: cleanPayerCpf, 
        payee: cleanPayeeCpf
      };

      await api.post("/transactional/register", payload);

      const responseBanco = await api.get(`/clients/${session.cpf}`);
      save(responseBanco.data);
      handleClose();
      window.dispatchEvent(new Event("transactionSuccess"));

      if (responseBanco.data.notificationSent) {
      toast.success("Transferência realizada com sucesso! O recebedor foi notificado.");
      } else {
          toast.error("Transferência concluída, mas o sistema de envio de e-mails/SMS está temporariamente instável. O dinheiro já está na conta destino!");
      }
    } catch (error) {
      console.error("Erro na transferência:", error);
      toast.error("Erro ao transferir. Verifique o CPF destino ou seu saldo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = amount > 0 && cpf.replace(/\D/g, "").length === 11;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Send Money"
      description="Transfer to any CPF instantly."
    >
      <div className="flex flex-col gap-4">
        
        <Input
          legend="PAYEE CPF"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={handleCPFChange}
          maxLength={14}
          disabled={isSubmitting}
        />

        <Input
          legend="AMOUNT"
          placeholder="R$ 0,00"
          value={amount > 0 ? `R$ ${formatCurrency(amount)}` : ""}
          onChange={handleAmountChange}
          disabled={isSubmitting}
        />

        <Button 
          className="w-full mt-2 bg-green-primary hover:bg-[#1f9d5a] text-white h-12 rounded-lg transition-colors disabled:opacity-50"
          onClick={handleConfirmTransfer}
          disabled={isSubmitting || !isFormValid}
        >
          <span className="flex items-center justify-center gap-2 font-medium">
            {isSubmitting ? "Processing..." : "Review"} <FiArrowRight size={18} />
          </span>
        </Button>
      </div>
    </Modal>
  );
}