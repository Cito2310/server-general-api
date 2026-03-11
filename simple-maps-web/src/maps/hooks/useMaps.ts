import { useEffect } from 'react'
import api from '../../lib/axios'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setMaps, setLoading, setError, removeMap } from '../../store/maps/mapsSlice'

export const useMaps = () => {
    const dispatch = useAppDispatch()
    const { maps, loading, error } = useAppSelector((state) => state.maps)

    const fetchMaps = async () => {
        dispatch(setLoading(true))
        dispatch(setError(null))
        try {
            const res = await api.get('/maps')
            dispatch(setMaps(res.data))
        } catch {
            dispatch(setError('No se pudieron cargar los mapas'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const deleteMap = async (id: string) => {
        try {
            await api.delete(`/maps/${id}`)
            dispatch(removeMap(id))
        } catch {
            dispatch(setError('No se pudo eliminar el mapa'))
        }
    }

    useEffect(() => {
        fetchMaps()
    }, [])

    return { maps, loading, error, deleteMap, refetch: fetchMaps }
}
