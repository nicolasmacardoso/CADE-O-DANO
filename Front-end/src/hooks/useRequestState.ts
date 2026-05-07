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
        } catch (e) {
            console.log(e);
            setError("Erro ao buscar histórico");
            return undefined;
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        setError,
        run,
    };
}

export default useRequestState;