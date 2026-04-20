import { useState, useEffect } from "react";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { classMerge } from "../../utils/classMerge";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../service/api"; 
import { formatCurrency } from "../../utils/currencyUtils"; 

interface Transaction {
  id: string;
  name: string;
  type: "received" | "sent";
  date: string;
  description: string;
  amount: number;
}

interface StatementResponse {
  transactions: Transaction[];
}

interface TransactionPanelProps {
  refreshTrigger: number; 
}

export function TransactionPanel({ refreshTrigger }: TransactionPanelProps) {
  const { session } = useAuth();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      if (!session?.cpf) return;

      try {
        const response = await api.get<StatementResponse>(`/transactional/statement/${session.cpf}`);
        setTransactions(response.data.transactions || []); 
      } catch (error) {
        console.error("Erro ao buscar o extrato de transações:", error);
      }
    }

    loadTransactions();
  }, [session?.cpf, refreshTrigger]);

  return (
    <div className="bg-white rounded-xl py-6 w-full mt-10 max-h-150 overflow-y-auto shadow-sm border border-gray-100">
      
      <div className="px-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
        <span className="text-sm text-gray-400">Your latest activity</span>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-y border-gray-100">
            <th className="py-3 px-8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaction</th>
            <th className="py-3 px-8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
            <th className="py-3 px-8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
            <th className="py-3 px-8 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 text-center text-gray-400">
                Nenhuma transação encontrada.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => {
              const isReceived = tx.type === "received";

              return (
                <tr 
                  key={tx.id} 
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-8">
                    <div className="flex items-center gap-4">
                      <div
                        className={classMerge(
                          "flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
                          isReceived ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                        )}
                      >
                        {isReceived ? <FiArrowDownLeft size={20} /> : <FiArrowUpRight size={20} />}
                      </div>

                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{tx.name}</span>
                        <span className="text-sm text-gray-400 capitalize">{tx.type}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-8 text-sm text-gray-500 whitespace-nowrap">
                    {tx.date}
                  </td>

                  <td className="py-4 px-8 text-sm text-gray-500">
                    {tx.description}
                  </td>

                  <td
                    className={classMerge(
                      "py-4 px-8 text-right font-bold whitespace-nowrap",
                      isReceived ? "text-green-600" : "text-red-500"
                    )}
                  >
                    {isReceived ? "+ " : "- "}
                    {formatCurrency(tx.amount)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}