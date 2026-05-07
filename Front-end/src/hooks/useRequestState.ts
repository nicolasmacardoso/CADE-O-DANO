import { useState } from "react";

function useRequestState() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    async function run<T>(fn: () => Promise<T>): Promise<Awaited<T> | undefined> {
        setLoading(true);
        setError("");

        try {
            const result = await fn();
            
            return result;
        } catch(e) {
            let erro: string;
            
            if (e instanceof Error) {
                erro =  e.message;
            } else if (typeof e === "string") {
                erro = e;
            } else {
                erro = "Erro desconhecido ao realizar requisição";
            }
                
            console.log(erro);
            setError(erro);

            return undefined;
        } finally {
            setLoading(false);
        }
    }

    function clearError() {
        setError("");
    }

    return {
        loading,
        error,
        run,
        clearError
    };
}

export default useRequestState;