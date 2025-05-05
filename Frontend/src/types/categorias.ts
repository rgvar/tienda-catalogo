

export interface Categoria {
    id: number,
    label: string,
    link: string,
}

export const getCategoriaId = (nombre: string) => {
    const normalizeText = (text: string) => {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    };

    for (const cat of categorias) {
        if (normalizeText(nombre) === normalizeText(cat.label)) {
            return cat.id;
        }

    }
    return -1;
}

export const categorias: Categoria[] = [
    { id: 1, label: "Cuerdas", link: "categoria/cuerdas" },
    { id: 2, label: "Viento", link: "categoria/viento" },
    { id: 3, label: "Percusión", link: "categoria/percusion" },
    { id: 4, label: "Teclados", link: "categoria/teclados" },
    { id: 5, label: "Electrónicos", link: "categoria/electronicos" },
    { id: 6, label: "Otros", link: "categoria/otros" }
]
