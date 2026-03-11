import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { updateMap } from '../../store/maps/mapsSlice'
import type { Map, Node } from '../map.types'

export const useMapDetail = (mapId: string) => {
    const dispatch = useAppDispatch()
    const cachedMap = useAppSelector((state) => state.maps.maps.find((m) => m._id === mapId))
    const [map, setMap] = useState<Map | null>(cachedMap ?? null)
    const [loading, setLoading] = useState(!cachedMap)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (cachedMap) {
            setMap(cachedMap)
            return
        }
        const fetch = async () => {
            setLoading(true)
            try {
                const res = await api.get(`/maps/${mapId}`)
                setMap(res.data)
            } catch {
                setError('No se pudo cargar el mapa')
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [mapId])

    const saveNodes = async (nodes: Node[]) => {
        if (!map) return
        try {
            const res = await api.put(`/maps/${mapId}`, { nodes })
            setMap(res.data)
            dispatch(updateMap(res.data))
        } catch {
            setError('No se pudieron guardar los cambios')
        }
    }

    const addNode = async (node: Omit<Node, '_id'>, parentId?: string) => {
        if (!map) return
        const newNode = { ...node, children: [] }
        let updatedNodes: Node[]

        if (parentId) {
            updatedNodes = map.nodes.map((n) =>
                n._id === parentId
                    ? { ...n, children: [...n.children, ''] }
                    : n
            )
            const tempNodes = [...map.nodes, newNode as Node]
            await saveNodes(tempNodes)
        } else {
            updatedNodes = [...map.nodes, newNode as Node]
            await saveNodes(updatedNodes)
        }
    }

    const updateNode = async (nodeId: string, data: Partial<Omit<Node, '_id' | 'children'>>) => {
        if (!map) return
        const updatedNodes = map.nodes.map((n) =>
            n._id === nodeId ? { ...n, ...data } : n
        )
        await saveNodes(updatedNodes)
    }

    const deleteNode = async (nodeId: string) => {
        if (!map) return
        const updatedNodes = map.nodes
            .filter((n) => n._id !== nodeId)
            .map((n) => ({ ...n, children: n.children.filter((c) => c !== nodeId) }))
        await saveNodes(updatedNodes)
    }

    const addChildNode = async (parentId: string, node: Omit<Node, '_id' | 'children'>) => {
        if (!map) return
        const res = await api.put(`/maps/${mapId}`, {
            nodes: [...map.nodes, { ...node, children: [] }],
        })
        const savedMap: Map = res.data
        const newNode = savedMap.nodes[savedMap.nodes.length - 1]
        const finalNodes = savedMap.nodes.map((n) =>
            n._id === parentId
                ? { ...n, children: [...n.children, newNode._id] }
                : n
        )
        await saveNodes(finalNodes)
    }

    return { map, loading, error, addNode, updateNode, deleteNode, addChildNode }
}
