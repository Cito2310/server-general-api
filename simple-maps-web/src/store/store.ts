import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import mapsReducer from './maps/mapsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        maps: mapsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
