import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '../../shared/components/Input'
import { useRegister } from '../hooks/useAuth'

type FormData = {
    username: string
    password: string
}

const RegisterForm = () => {
    const { register: registerUser, loading, error } = useRegister()
    const { register, handleSubmit } = useForm<FormData>()

    const onSubmit = (data: FormData) => {
        registerUser(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Input
                label="Usuario"
                type="text"
                placeholder="elige un usuario"
                {...register('username', { required: true })}
            />
            <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                {...register('password', { required: true })}
            />

            {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            <p className="text-sm text-center text-gray-500">
                ¿Ya tenés cuenta?{' '}
                <Link to="/login" className="text-gray-900 font-medium hover:underline">
                    Iniciar sesión
                </Link>
            </p>
        </form>
    )
}

export default RegisterForm
