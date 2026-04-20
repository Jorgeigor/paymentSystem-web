import { useActionState } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import Logotype from '../assets/Logotype.png'
import { Button } from '../components/shared/Button'
import { Input } from '../components/shared/Input'
import { api } from "../service/api"
import { useAuth } from "../hooks/useAuth"

const SignInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
})

export function SignIn(){
    const [state, formAction, isLoading] = useActionState(signIn, null)
    const auth = useAuth()
    async function signIn( _: any, formData: FormData){
        try {
            const data = SignInSchema.parse({
                email: formData.get("email"),
                password: formData.get("password")
            })
            const response = await api.post("/clients/login", data)
            auth.save(response.data)
        } catch(error){
            console.log(error)

            if(error instanceof ZodError){
                return { message:  error.issues[0].message}
            }
            if(error instanceof AxiosError){
                return { message: error.response?.data.message}
            }
            return { message: "Não foi possivel entrar"}
        }
    }
    return(
        <div className="h-screen bg-green-300 flex items-center justify-center">
            <div className="h-[520px] w-[460px] flex flex-col items-center gap-4 rounded-lg bg-white p-10">
                <img src={Logotype} alt="Logotipo"  className='my-8'/>
                <form action={formAction} className='w-full flex flex-col gap-4'>
                    <Input name="email" legend="Email" placeholder='Digite seu email' type="email"/>
                    <Input name="password" legend="Senha" placeholder='Digite sua senha' type="password"/>
                    <p className="text-sm text-red-600 text-center my-4 font-medium">
                        {state?.message}
                    </p>
                    <Button type='submit'className='mt-10' isLoading={isLoading}>
                        Entrar
                    </Button>
                </form>
                <p className="text-sm text-gray-600">
                    Não tem conta? <a href="/signup" className="text-green-500 hover:underline">Crie uma agora</a>
                </p>
            </div>
        </div>
    )
}