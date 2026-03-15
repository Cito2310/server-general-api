import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { generateId } from '../../shared/utils/id';
import type { Nodo } from '../../types';

export const useNodos = () => {
    const [nodos, setNodos] = useLocalStorage<Nodo[]>('nodos', []);

    const crear = (temaId: string, parentId: string | null, label: string, contenido: string, contenidoModo: 'inline' | 'bloque' = 'bloque') => {
        const hermanos = nodos.filter(n => n.temaId === temaId && n.parentId === parentId);
        const orden = hermanos.length;
        const nuevo: Nodo = { id: generateId(), temaId, parentId, label, contenido, contenidoModo, orden };
        setNodos(prev => [...prev, nuevo]);
    };

    const editar = (id: string, label: string, contenido: string, contenidoModo: 'inline' | 'bloque' = 'bloque') => {
        setNodos(prev => prev.map(n => n.id === id ? { ...n, label, contenido, contenidoModo } : n));
    };

    const eliminar = (id: string) => {
        const idsAEliminar = new Set<string>();

        const recolectar = (nodoId: string) => {
            idsAEliminar.add(nodoId);
            nodos.filter(n => n.parentId === nodoId).forEach(hijo => recolectar(hijo.id));
        };

        recolectar(id);
        setNodos(prev => prev.filter(n => !idsAEliminar.has(n.id)));
    };

    const porTema = (temaId: string) => nodos.filter(n => n.temaId === temaId);

    const hijos = (temaId: string, parentId: string | null) =>
        nodos
            .filter(n => n.temaId === temaId && n.parentId === parentId)
            .sort((a, b) => a.orden - b.orden);

    return { nodos, crear, editar, eliminar, porTema, hijos };
};
