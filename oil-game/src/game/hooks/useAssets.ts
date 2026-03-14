import { useState, useEffect } from 'react'

export type AssetMap = Record<string, HTMLImageElement>

export const useAssets = (paths: Record<string, string>) => {
    const [assets, setAssets] = useState<AssetMap>({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const entries = Object.entries(paths)

        if (entries.length === 0) {
            setLoaded(true)
            return
        }

        const result: AssetMap = {}
        let pending = entries.length

        const onSettled = () => {
            if (--pending === 0) {
                setAssets({ ...result })
                setLoaded(true)
            }
        }

        for (const [key, src] of entries) {
            const img = new Image()
            img.onload = () => {
                result[key] = img
                onSettled()
            }
            img.onerror = () => {
                console.warn(`[useAssets] No se pudo cargar: ${src}`)
                onSettled()
            }
            img.src = src
        }
    }, []) // paths no debe cambiar en runtime

    return { assets, loaded }
}
