import Logotype from "../../assets/Logotype.png"
import { Button } from "./Button";
import { 
  LuLayoutDashboard, 
  LuArrowLeftRight, 
  LuCirclePlus, 
  LuSettings,
  LuLogOut
} from "react-icons/lu";
import { useModals } from "../../contexts/ModalContext";
import { useAuth } from "../../hooks/useAuth";


export function SideBar() {
    const session = useAuth().session;
    const { remove } = useAuth();

    const formatInitials = (fullName:  string | undefined | null): string => {
        if (!fullName) return "";
        const names = fullName.trim().split(" ");
        if (names.length === 0) return "";
        const firstInitial = names[0].charAt(0).toUpperCase();
        if(names.length > 1){
            const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
            return `${firstInitial}${lastInitial}`;
        }
        return firstInitial;
    };

    const handleLogout = () => {
        remove();
    }


    const { openAddMoney, openTransfer } = useModals();
    return (
        <div className="w-64 h-screen bg-sidebar text-white flex flex-col">
            <div className="border-b border-sidebar-accent px-4 flex justify-center mb-4">
                <img src={Logotype} alt="Logotype"  className='my-8'/>
            </div>
            
            <div className="flex flex-col flex-1 gap-1 px-4">
                    <Button 
                        className="group flex items-center justify-between w-full bg-transparent rounded-xl hover:bg-sidebar-hover focus:bg-sidebar-accent px-3 py-2.5 transition-all" 
                        variant="icon"
                    >
                        <div className="flex items-center gap-3">
                            <LuLayoutDashboard className="text-gray-500 group-focus:text-green-primary group-hover:text-white transition-colors" size={20} />
                            <span className="text-gray-500 group-focus:text-white font-medium group-hover:text-white transition-colors">Dashboard</span>
                        </div>

                        <div className="w-1.5 h-1.5 rounded-full bg-green-primary opacity-0 group-focus:opacity-100 transition-opacity" />
                    </Button>

                    <Button 
                        className="group flex items-center justify-between w-full bg-transparent rounded-xl hover:bg-sidebar-hover focus:bg-sidebar-accent px-3 py-2.5 transition-all" 
                        variant="icon"
                        onClick={openTransfer}
                    >
                        <div className="flex items-center gap-3">
                            <LuArrowLeftRight className="text-gray-500 group-focus:text-green-primary group-hover:text-white transition-colors" size={20} />
                            <span className="text-gray-500 group-focus:text-white font-medium group-hover:text-white transition-colors">Transfers</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-primary opacity-0 group-focus:opacity-100 transition-opacity" />
                    </Button>

                    <Button 
                        className="group flex items-center justify-between w-full bg-transparent rounded-xl hover:bg-sidebar-hover focus:bg-sidebar-accent px-3 py-2.5 transition-all" 
                        variant="icon"
                        onClick={openAddMoney}
                    >
                        <div className="flex items-center gap-3">
                            <LuCirclePlus className="text-gray-500 group-focus:text-green-primary group-hover:text-white transition-colors" size={20} />
                            <span className="text-gray-500 group-focus:text-white font-medium group-hover:text-white transition-colors">Add Balance</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-primary opacity-0 group-focus:opacity-100 transition-opacity" />
                    </Button>

                    <Button 
                        className="group flex items-center justify-between w-full bg-transparent rounded-xl hover:bg-sidebar-hover focus:bg-sidebar-accent px-3 py-2.5 transition-all" 
                        variant="icon"
                    >
                        <div className="flex items-center gap-3">
                            <LuSettings className="text-gray-500 group-focus:text-green-primary group-hover:text-white transition-colors" size={20} />
                            <span className="text-gray-500 group-focus:text-white font-medium group-hover:text-white transition-colors">Settings</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-primary opacity-0 group-focus:opacity-100 transition-opacity" />
                    </Button>               
            </div>

            <div className="w-full px-4 py-5 flex items-center gap-2 border-t border-sidebar-accent transition-all">
                    <Button variant="iconSmall" className="rounded-full h-10 w-10 shrink-0 bg-green-primary">
                        <span className="text-gray-100 group-focus:text-white font-medium group-hover:text-white transition-colors">{formatInitials(session?.name)}</span>
                    </Button>

                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                        <span className="text-gray-100 group-focus:text-white font-medium group-hover:text-white transition-colors truncate">{session?.name}</span>
                        <Button 
                        onClick={handleLogout}
                        variant="iconSmall" 
                        className="rounded-full h-8 w-8 shrink-0 bg-transparent hover:bg-transparent">
                            <LuLogOut className="text-gray-500" size={16} />
                        </Button>
                        </div>

                        <span className="text-gray-500 group-focus:text-gray-300 group-hover:text-gray-300 transition-colors text-sm truncate">{session?.email}</span>
                    </div>
                </div>
        </div>
    )
}