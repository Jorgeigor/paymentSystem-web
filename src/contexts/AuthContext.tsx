import { createContext } from "react"
import { useState, useEffect } from "react"
import { api } from "../service/api"

interface AuthContextData {
    isLoading: boolean
    session: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
    remove: () => void
}

const LOCAL_STORAGE_KEY = "@payment_system_user"

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<null | UserAPIResponse>(null)
    const [isLoading, setIsLoading] = useState(true)
    function save(data: UserAPIResponse) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data))


        setSession(data)
    }

    function remove(){
            setSession(null)
            localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
            window.location.assign("/")
        }
    
    function loadUser(){
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)

        if(user){
        const parsedUser = JSON.parse(user)
            setSession(parsedUser)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    return(
        <AuthContext.Provider value={{ session, save, isLoading, remove }}>
            {children}
        </AuthContext.Provider>
    )
}