// src/components/balance/Card.tsx
import { useState } from "react";
import { FiEye, FiEyeOff, FiArrowUpRight, FiPlus } from "react-icons/fi"; 
import { classMerge } from "../../utils/classMerge"; 
interface CardProps {
  variant?: "normal" | "balance"; 
  title: string; 
  className?: string; 

  description?: string; 
  iconType?: "transfer" | "add"; 

  amount?: number | string; 
  changePercentage?: string; 
  onClick?: () => void;
}

export function Card({
  variant = "normal",
  title,
  className,
  description,
  iconType,
  amount,
  changePercentage,
  onClick,
}: CardProps) {
  
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const baseClasses = "flex rounded-3xl transition-all h-full"; 
  
  const variantClasses = {
    
    normal: "flex-col items-start bg-white p-6 shadow-sm border border-zinc-100 hover:border-green-primary/30 text-zinc-900 cursor-pointer",
    
    
    balance: "relative overflow-hidden flex-col items-start bg-sidebar p-7 text-white shadow-2xl rounded-3xl border border-zinc-800",
  };

  
  const icons = {
    transfer: <FiArrowUpRight size={22} className="text-white" />,
    add: <FiPlus size={22} className="text-white" />,
  };

  
  if (variant === "balance") {
    const ActualEyeIcon = isBalanceVisible ? FiEye : FiEyeOff;
    const displayedAmount = isBalanceVisible ? amount : "R$ ********";

    return (
      <div className={classMerge(baseClasses, variantClasses.balance, className)}>
        
       
        <svg 
            className="absolute bottom-0 right-0 pointer-events-none" 
            width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
            <circle cx="300" cy="300" r="250" fill="#21B567" opacity="0.02" />
            <circle cx="300" cy="300" r="170" fill="#21B567" opacity="0.03" />
            <circle cx="300" cy="300" r="90"  fill="#21B567" opacity="0.04" />
        </svg>

        <div className="relative z-10 w-full flex flex-col h-full">           
            <div className="flex items-center justify-between w-full mb-3">
              <span className="text-sm font-medium text-zinc-400">{title}</span>
              <button
                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                aria-label={isBalanceVisible ? "Esconder saldo" : "Mostrar saldo"}
                className="text-zinc-500 hover:text-white transition-colors p-1"
              >
                <ActualEyeIcon size={18} />
              </button>
            </div>

            <p className="text-amount font-extrabold tracking-tight mb-5 whitespace-nowrap">
              {displayedAmount}
            </p>

            {changePercentage && (
              <div className="flex items-center gap-1 text-green-500 text-xs font-medium mt-auto">
                <FiArrowUpRight size={14} />
                <span>{changePercentage}</span>
              </div>
            )}

        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className={classMerge(baseClasses, variantClasses.normal, onClick && "cursor-pointer", className)}>
      {iconType && (
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500 mb-6 shrink-0">
          {icons[iconType]}
        </div>
      )}

      <p className="text-xl font-bold mb-1.5">{title}</p>
      
      {description && (
        <p className="text-sm text-zinc-500 leading-relaxed max-w-[90%]">
          {description}
        </p>
      )}
    </div>
  );
}