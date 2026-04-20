import { Routes, Route, Navigate } from "react-router-dom"; 
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";


export function AuthRoutes(){
    return(
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/signin" />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}