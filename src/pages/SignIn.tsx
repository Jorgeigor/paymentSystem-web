import Logotipo from '../assets/Logotipo.png'
import { Button } from '../components/shared/Button'
import { Input } from '../components/shared/Input'
export function SignIn(){
    return(
        <div className="h-screen bg-green-300 flex items-center justify-center">
            <div className="h-[520px] w-[460px] flex flex-col items-center gap-4 rounded-lg bg-white p-10">
                <img src={Logotipo} alt="Logotipo"  className='my-8'/>
                <form action="" className='w-full flex flex-col gap-4'>
                    <Input legend="Email" placeholder='Digite seu email' type="email"/>
                    <Input legend="Senha" placeholder='Digite sua senha' type="password"/>
                    <Button type='submit'className='mt-10'>
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