import { CookieBanner } from "@/components/cookieBanner";
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
            overflow-y-auto
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

            <section className="flex-1 flex flex-col items-center justify-between">
                 <section className="
                    md:justify-center md:items-center h-full
                    flex flex-col items-center flex-1 gap-4 p-6
                    ">
                        {/* Texto informativo */}
                        <p className="text-black font-bold text-center
                            lg:text-5xl
                            md:text-4xl
                            sm:text-3xl 
                            text-2xl
                        ">
                            Login
                        </p>
                        <p className="text-black  font-bold text-center
                            lg:text-md
                            md:text-sm 
                            sm:text-xs 
                            text-xs
                        ">
                            Acesse sua conta consulte seus pedidos de pedidos.
                        </p>
                    <section className="flex flex-col items-center w-1/2">
                            <FormOrder />
                            <p className="text-black text-center text-wrap
                                lg:text-md
                                md:text-sm 
                                sm:text-xs 
                                xs:text-xs
                                text-[10px]
                            ">
                                Acesse com o CPF cadastrado pelo atendente no momento do serviço.
                            </p>
                    </section>      
                </section>
                <p className="text-gray-500 text-wrap
                        lg:text-md
                        md:text-sm 
                        sm:text-xs 
                        xs:text-xs
                        text-[8px]
                    ">
                        Demo: Cliente: 00000000002 · Admin: 00000000001 / adm123
                </p>
            </section>
            
            <CookieBanner />

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