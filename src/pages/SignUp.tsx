import { api } from "../service/api"
import { z, ZodError } from "zod"
import { Button } from "../components/shared/Button";
import { Input } from "../components/shared/Input";
import Logotype from '../assets/Logotype.png'
import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const signUpSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Endereço de e-mail inválido"),
    cpf: z.string().length(11, "O CPF deve conter exatamente 11 números"),
    customerType: z.enum(["PF", "PJ"], {
    message: "O tipo de cliente deve ser 'PF' ou 'PJ'"
}),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    passwordConfirm: z.string().min(8, "A confirmação da senha deve ter pelo menos 8 caracteres")
})
.refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não coincidem",
    path: ["passwordConfirm"] 
});

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [customerType, setCustomerType] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsloading] = useState(false)
    const [state , setState] = useState<{ message: string } | null>(null);
    const navigate = useNavigate();

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        const cleanCpf = cpf.replace(/\D/g, "");
        try {
            const data = signUpSchema.parse({
                name,
                email,
                cpf: cleanCpf,
                customerType,
                password,
                passwordConfirm
            });
            await api.post("/clients/register", data);
            navigate("/signin");
        } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
        setState({ message: error.issues[0].message });
        return;
    }
    
    if (error instanceof AxiosError) {
        setState({ message: error.response?.data.message || "Erro de conexão com o servidor." });
        return;
    }
    
    setState({ message: "Não foi possível realizar o cadastro." });

} finally {
    setIsloading(false);
}
}

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
        value = value
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    setCpf(value);
};    

    return(
        <div className="h-screen bg-green-300 flex items-center justify-center">
            <div className="min-h-134 w-150 flex flex-col items-center gap-2 rounded-lg bg-white p-10">
                <img src={Logotype} alt="Logotipo"  className='my-8'/>
                <form onSubmit={onSubmit} className='w-full flex flex-col gap-4'>
                    <div className="flex gap-4">
                    <Input name="name" legend="Nome" placeholder='Digite seu nome' onChange={(e) => setName(e.target.value)} />
                    <Input name="email" legend="Email" placeholder='Digite seu email' type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-400">Tipo de Cliente</label>
                        <select 
                            value={customerType}
                            onChange={(e) => setCustomerType(e.target.value)}
                            className="h-12 w-full rounded-md border border-gray-300 text-gray-400 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Selecione...</option>
                            <option value="PF">Pessoa Física (PF)</option>
                            <option value="PJ">Pessoa Jurídica (PJ)</option>
                        </select>
                        </div>
                    <Input 
                        name="cpf" legend="CPF" placeholder='000.000.000-00' value={cpf} onChange={handleCpfChange} maxLength={14} />
                    </div>

                    <div className="flex gap-4">
                    <Input name="password" legend="Senha" placeholder='Digite sua senha' type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Input name="passwordConfirm" legend="Confirme sua senha" placeholder='Confirme sua senha' type="password" onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>
                    <p className="text-sm text-red-500">
                        {state?.message}
                    </p>
                    <Button type='submit'className='mt-10' isLoading={isLoading}>
                        Registrar
                    </Button>
                </form>
                <p className="text-sm text-gray-600">
                    Já possui conta? <a href="/signin" className="text-green-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    )
}