import { BrowserRouter,Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { AppLayout } from "../components/shared/AppLayout";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<AppLayout />} >
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    )
}
export function AppRouter(){
    return(
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    )
}