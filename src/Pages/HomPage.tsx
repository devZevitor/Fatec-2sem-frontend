import { FormOrder } from "@/components/login";
import { useAuth } from "@/http/get/useAuth";
import { CheckCookies } from "@/utils/useCheckCookies";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export  function HomePage(){
    const {data} = useAuth()
    const [enabledCookie, isEnabledCookie] = useState<boolean>(false);

     useEffect(() => {
        const enabled = CheckCookies()
        isEnabledCookie(enabled)
    }, [])

    if (data?.ok || data?.status === true) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <main className="
            md:flex-row-reverse 
            h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col gap-2 relative p-4 rounded-xl shadow-lg
        ">
            
            <section className="  md:bg-[#F1F4FA]
                text-white text-2xl flex-1 flex flex-col 
                md:justify-center
                items-center justify-end 
                md:rounded-lg md:shadow-[0_10px_40px_rgba(0,0,0,0.08)]
            ">
            <img 
                src="/login1.png" 
                alt="Ícone de eletrodomésticos"
                className="w-[300px] md:w-[450px] lg:w-[500px] h-auto object-contain"
                />
            </section>

            <section className="
            md:justify-center md:items-center h-full
            flex flex-col w-full items-center flex-1 gap-4 p-6
            ">
                {/* Texto informativo */}
                <p className="text-black  font-bold mt-12 text-center
                    lg:text-3xl
                    md:text-2xl
                    sm:text-lg
                    text-md
                ">
                    Login
                </p>
                 <p className="text-black  font-bold text-center
                    lg:text-md
                    md:text-sm
                    text-xs
                ">
                    Faça login para acessar sua conta e gerenciar seus pedidos de eletrodomésticos.
                </p>
                <FormOrder />
            </section>

            { enabledCookie ? null : (
                <section className="w-full fixed bottom-0 flex items-center justify-center  text-white text-center p-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">⚠️ Cookies desativados</h2>
                        <p className="text-sm md:text-base">
                            Ative os cookies do navegador para acessar sua conta e continuar usando o sistema.
                        </p>
                    </div>
                </section>
            )}
        </main>
    )
}