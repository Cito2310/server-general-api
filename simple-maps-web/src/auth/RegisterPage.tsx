import RegisterForm from './components/RegisterForm'

const RegisterPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Simple Maps
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Creá tu cuenta para comenzar</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage
