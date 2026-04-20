import { createContext, useContext, useState, type ReactNode } from "react";
import { AddMoneyModal } from "../components/shared/AddMoneyModal";
import { TransferModal } from "../components/shared/TransferModal";

interface ModalContextData {
  openAddMoney: () => void;
  closeAddMoney: () => void;
  openTransfer: () => void;
  closeTransfer: () => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        openAddMoney: () => setIsAddMoneyOpen(true),
        closeAddMoney: () => setIsAddMoneyOpen(false),
        openTransfer: () => setIsTransferOpen(true),
        closeTransfer: () => setIsTransferOpen(false),
      }}
    >
      {children}

      <AddMoneyModal isOpen={isAddMoneyOpen} onClose={() => setIsAddMoneyOpen(false)} />
      
      <TransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />
      
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  
  return context;
}