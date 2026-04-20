// src/components/shared/AddMoneyModal.tsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"; 
import { FiPlusCircle } from "react-icons/fi";
import { Modal } from "./Modal";
import { Input } from "./Input";
import { Button } from "./Button";
import { api } from "../../service/api";
import { toast } from "react-hot-toast";

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMoneyModal({ isOpen, onClose }: AddMoneyModalProps) {
  const [textContent, setTextContent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session, save } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanContent = event.target.value.replace(/\D/g, '');
    
    if (cleanContent === '') {
      setTextContent(0);
      return;
    }

    const formattedContent = parseInt(cleanContent, 10);
    setTextContent(formattedContent);
  };

  const formattedValue = (value: number) => {
    return (value / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleClose = () => {
    setTextContent(0);
    onClose();
  }

  const handleConfirmDeposit = async () => {
    const cpf = session?.cpf;
    if (textContent <= 0 || !cpf) return;

    try {
      setIsSubmitting(true);
      const valorReal = textContent / 100;

      const payload = {
        cpf: cpf,
        value: valorReal
      };

      await api.post("/clients/addBalance", payload);
      const responseBanco = await api.get(`/clients/${session.cpf}`);
      save(responseBanco.data);

      handleClose();
      window.dispatchEvent(new Event("transactionSuccess"));
      toast.success("Depósito realizado com sucesso!");
    } catch (error) {
      console.error("Não foi possível realizar o depósito.", error);
      toast.error("Não foi possível realizar o depósito.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Balance"
      description="Only Individual Clients (PF) can deposit directly."
    >
      <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center justify-center gap-1 mb-2 border border-gray-100">
        <span className="text-sm text-gray-500 font-medium">Amount to deposit</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-xl font-bold text-gray-900">R$</span>
          <span className="text-[3rem] font-extrabold text-gray-900 tracking-tight leading-none">
            {formattedValue(textContent)}
          </span>
        </div>
      </div>

      <Input 
        type="tel"
        placeholder="0,00" 
        className="text-center font-medium bg-gray-50 border-gray-200" 
        value={textContent === 0 ? "" : formattedValue(textContent)}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      <Button 
        onClick={handleConfirmDeposit}
        disabled={textContent <= 0 || isSubmitting}
        className="w-full mt-2 bg-green-primary hover:bg-[#1f9d5a] text-white h-12 rounded-lg disabled:opacity-50 transition-all"
      >
        <span className="flex items-center justify-center gap-2 font-medium">
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <FiPlusCircle size={18} /> Confirm Deposit
            </>
          )}
        </span>
      </Button>
    </Modal>
  );
}