import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '../../shared/components/Input'
import { useLogin } from '../hooks/useAuth'

type FormData = {
    username: string
    password: string
}

const LoginForm = () => {
    const { login, loading, error } = useLogin()
    const { register, handleSubmit } = useForm<FormData>()

    const onSubmit = (data: FormData) => {
        login(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Input
                label="Usuario"
                type="text"
                placeholder="tu usuario"
                data-testid="login-username"
                {...register('username', { required: true })}
            />
            <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                data-testid="login-password"
                {...register('password', { required: true })}
            />

            {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                data-testid="login-submit"
                className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
                {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>

            <p className="text-sm text-center text-gray-500">
                ¿No tenés cuenta?{' '}
                <Link to="/register" className="text-gray-900 font-medium hover:underline">
                    Registrarte
                </Link>
            </p>
        </form>
    )
}

export default LoginForm
