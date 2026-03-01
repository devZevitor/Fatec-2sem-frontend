import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../api";
import { authFetch } from "../authFetch";
import type { getAuthenticateType } from "../types/get-authenticate-type";

// const fetchAuth = async (token?: string) => {

//     const Headers: HeadersInit = {
//         'Content-Type': 'application/json'
//     };

//     if(token){
//         Headers['Authorization'] = `Bearer ${token}`;
//     }

//     const result = await fetch(`${API_URL}/auth`, {
//         method: 'GET',
//         headers: Headers, 
//         credentials: 'include'
//     })

//     return result;
// }

export const useAuth = () => {
    return useQuery({
        queryKey: ['auth-admin'],
        queryFn: async (): Promise<getAuthenticateType> => {
           
            const response = await authFetch(`${API_URL}/auth`);

            if (response.ok) {
                const data = await response.json();
                return {
                    ok: response.ok,
                    status: response.status,
                    ...data
                };
            }
            
            throw new Error(`Auth failed with status: ${response.status}`);
        },
        retry: false,
        enabled: true,
        staleTime: 1000 * 60 * 5,
    })
}