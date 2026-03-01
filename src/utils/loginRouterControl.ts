import type { getAuthenticateType } from "@/http/types/get-authenticate-type";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useLoginRouterControl(pathOrigin: string, pathDestination: string, data: getAuthenticateType, isLoading: boolean) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;

        const timer = setTimeout(() => {
            if (!data.ok && data.status !== 200 && !data.authenticate) {
                return navigate("/");
            }

            if(pathOrigin === "/" && pathDestination === "/dashboard" && data.ok && data.status === 200 && data.authenticate) {
                return navigate("/dashboard");
            }
        
        }, 100)
        return () => clearTimeout(timer)
    }, [data?.ok, data?.authenticate, data?.status, isLoading, navigate])
}