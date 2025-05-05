import { API_ENDPOINTS } from "../apiConfig"

export const searchInstrumentos = async (search: string) => {

    if (!search) {
        try {
            const result = await fetch(API_ENDPOINTS.instrumentos);
            const response = result.json()
            return response;
        } catch (error) {
            console.error(error);
        }

    } else {
        try {
            const result = await fetch(`${API_ENDPOINTS.search}/${search}`);
            const response = result.json()
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}

export const sellInstrumento = async (id: number, cantidad: number) => {
    try {
        const result = await fetch(`${API_ENDPOINTS.venta}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cantidad)
        });
        const response = result.json()
        return response;
    } catch (error) {
        console.error(error);
    }
}