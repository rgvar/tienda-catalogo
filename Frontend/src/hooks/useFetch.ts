import { useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Props<T> {
    data: Data<T>;
    loading: boolean;
    error: Error | null;
}

export const useFetch = <T>(url: string): Props<T> => {
    const [data, setData] = useState<Data<T>>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {
        let controller = new AbortController();
        const fetchData  = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, controller);
                if (!response.ok) {
                    throw new Error("Error en la petición")
                }
                const jsonData: T = await response.json();
                setData(jsonData);
                setError(null);
            } catch (err) {
                setError(err as Error)
                console.error(err);
            } finally {
                setLoading(false);
            }

        }

        fetchData();

        return () => {
            controller.abort();
        }

    }, [url]);

    return {data, loading, error};

}
