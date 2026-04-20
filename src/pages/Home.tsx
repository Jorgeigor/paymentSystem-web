import { useEffect, useState } from "react";
import { Card } from "../components/dashboard/Card"
import { TransactionPanel } from "../components/dashboard/TransactionPanel"
import { useModals } from "../contexts/ModalContext";
import { useAuth } from "../hooks/useAuth";
import { formatCurrency } from "../utils/currencyUtils";

export function HomePage(){
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const { session } = useAuth()
  const { openAddMoney, openTransfer } = useModals()
  
  useEffect(() => {
    const handleRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener("transactionSuccess", handleRefresh);

    return () => {
      window.removeEventListener("transactionSuccess", handleRefresh);
    };
  }, []);

    return(
        <div className=" bg-green-300 flex flex-col h-full items-center p-10">
            
            <div className="flex items-start gap-5 w-full">
        
        <Card 
          variant="balance"
          title="Current Balance"
          amount={formatCurrency(session?.balance)}
          changePercentage="+12.5% this month"
          className="flex-1" 
        />
        
        
          <Card 
            title="Transfer"
            description="Send money to any CPF number"
            iconType="transfer"
            className="flex-1 cursor-pointer hover:border-green-primary" 
            onClick={openTransfer}
          />
      
        
        <Card 
          title="Add Money"
          description="Deposit to your balance via Pix"
          iconType="add"
          className="flex-1"
          onClick={openAddMoney}
        />
      </div>
        <TransactionPanel refreshTrigger={refreshTrigger}/>
     
        </div>
    )
}
