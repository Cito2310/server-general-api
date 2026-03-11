import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Map } from '../../maps/map.types'

type MapsState = {
    maps: Map[]
    loading: boolean
    error: string | null
}

const initialState: MapsState = {
    maps: [],
    loading: false,
    error: null,
}

const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setMaps: (state, action: PayloadAction<Map[]>) => {
            state.maps = action.payload
        },
        addMap: (state, action: PayloadAction<Map>) => {
            state.maps.unshift(action.payload)
        },
        updateMap: (state, action: PayloadAction<Map>) => {
            const index = state.maps.findIndex((m) => m._id === action.payload._id)
            if (index !== -1) state.maps[index] = action.payload
        },
        removeMap: (state, action: PayloadAction<string>) => {
            state.maps = state.maps.filter((m) => m._id !== action.payload)
        },
    },
})

export const { setLoading, setError, setMaps, addMap, updateMap, removeMap } = mapsSlice.actions
export default mapsSlice.reducer
