type CustomerType = "INDIVIDUAL_CLIENT" | "CORPORATE_CLIENT";

type UserAPIResponse = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    balance: number; 
    customerType: CustomerType;
}