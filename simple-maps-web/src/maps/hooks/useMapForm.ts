import { useState } from 'react'
import api from '../../lib/axios'
import { useAppDispatch } from '../../store/hooks'
import { addMap, updateMap } from '../../store/maps/mapsSlice'

type Props = {
    onSuccess: () => void
}

export const useMapForm = ({ onSuccess }: Props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    const submit = async (title: string, mapId?: string) => {
        setLoading(true)
        setError(null)
        try {
            if (mapId) {
                const res = await api.put(`/maps/${mapId}`, { title })
                dispatch(updateMap(res.data))
            } else {
                const res = await api.post('/maps', { title })
                dispatch(addMap(res.data))
            }
            onSuccess()
        } catch {
            setError('No se pudo guardar el mapa')
        } finally {
            setLoading(false)
        }
    }

    return { submit, loading, error }
}
