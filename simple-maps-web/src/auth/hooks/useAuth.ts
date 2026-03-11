import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/axios'
import { useAppDispatch } from '../../store/hooks'
import { setToken, clearToken } from '../../store/auth/authSlice'

type LoginData = {
    username: string
    password: string
}

type RegisterData = {
    username: string
    password: string
}

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const login = async (data: LoginData) => {
        setLoading(true)
        setError(null)
        try {
            const res = await api.post('/auth/login', data)
            dispatch(setToken(res.data.token))
            navigate('/maps')
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return { login, loading, error }
}

export const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const register = async (data: RegisterData) => {
        setLoading(true)
        setError(null)
        try {
            await api.post('/users', data)
            navigate('/login')
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Error al crear cuenta')
        } finally {
            setLoading(false)
        }
    }

    return { register, loading, error }
}

export const useLogout = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(clearToken())
        navigate('/login')
    }

    return { logout }
}
