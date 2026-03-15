export interface Materia {
    id: string;
    nombre: string;
}

export interface Unidad {
    id: string;
    materiaId: string;
    nombre: string;
}

export interface Tema {
    id: string;
    unidadId: string;
    nombre: string;
}

export interface Nodo {
    id: string;
    temaId: string;
    parentId: string | null;
    label: string;
    contenido: string;
    contenidoModo: 'inline' | 'bloque';
    orden: number;
}
