import { Routes, Route } from "react-router-dom"; 
import { SignIn } from "../pages/SignIn";


function AuthRoutes(){
    return(
        <Routes>
            <Route path="/signin" element={<SignIn />} />
           {/* <Route path="/signup" element={<SignUp />} />*/}
        </Routes>
    )
}