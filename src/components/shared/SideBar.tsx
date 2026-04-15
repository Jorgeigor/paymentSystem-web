import Logotipo from "../assets/logotipo.png"
import { Button } from "./Button";
import { 
  LuLayoutDashboard, 
  LuArrowLeftRight, 
  LuCirclePlus, 
  LuSettings
} from "react-icons/lu";

export function SideBar() {
    return (
        <div className="w-64 h-screen bg-sidebar text-white flex flex-col">
            <div className="border-b border-sidebar-accent px-4 flex justify-center mb-4">
                <img src={Logotipo} alt="Logotipo"  className='my-8'/>
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
                        <span className="text-gray-100 group-focus:text-white font-medium group-hover:text-white transition-colors">JB</span>
                    </Button>

                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-gray-100 group-focus:text-white font-medium group-hover:text-white transition-colors truncate">John Doe</span>
                        <span className="text-gray-500 group-focus:text-gray-300 group-hover:text-gray-300 transition-colors text-sm truncate">johnjohnjohnjohn.doe@example.com</span>
                    </div>
                </div>
        </div>
    )
}