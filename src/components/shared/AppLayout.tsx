// src/components/shared/AppLayout.tsx
import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";

export function AppLayout() {
    return(
        <div className="flex h-screen w-screen overflow-hidden">
            <SideBar />
      
            <main className="flex-1 overflow-y-auto bg-background">
                <Outlet />
            </main>
        </div>
    )
}