import type { LoginResponseType } from "@/http/types/response-loginAdmin-type";
import type { LoginType } from "@/http/types/post-loginAdmin-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { authFetch } from "../authFetch";
import { CheckCookies } from "@/utils/useCheckCookies";

export const useLoginAdmin = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (data: LoginType) => {
            const response = await authFetch(`${API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                let errorMessage = `Erro ao logar. status = ${response.status}`
                try {
                    const erroData = await response.json()
                    errorMessage = erroData.message || errorMessage
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                   // Ignora se não conseguir ler o JSON.
                }

                throw {
                    status: response.status,
                    message: errorMessage
                }
            }

            const result:LoginResponseType = await response.json()
            return result
        },
        onSuccess: (data) => {
            const enabled = CheckCookies()
            if(!enabled && data.token){
                localStorage.setItem("token", data.token)
            }
            
            queryClient.setQueryData(['auth-admin'], {
                ok: true,
                status: 200,
                authenticate: true
            })
            
            navigate("/dashboard", { replace: true })
        },
    })
}