import { BrowserRouter,Navigate,Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes.tsx";
import { HomePage } from "../pages/Home";
import { AppLayout } from "../components/shared/AppLayout";
import { useAuth } from "../hooks/useAuth";

function AppRoutes(){

    
    return(
        <Routes>
            
            <Route path="/" element={<AppLayout />} >
                    <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}
export function AppRouter() { 
    const { session, isLoading } = useAuth();
    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Carregando...</div>;
    }

    return (
        <BrowserRouter>
            {!session ? <AuthRoutes /> : <AppRoutes />}
        </BrowserRouter>
    );
}