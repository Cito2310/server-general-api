import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'
import MapsPage from './maps/MapsPage'
import MapDetailPage from './maps/MapDetailPage'
import ProtectedRoute from './shared/components/ProtectedRoute'

const App = () => {
    const token = useAppSelector((state) => state.auth.token)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={token ? '/maps' : '/login'} replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/maps" element={<ProtectedRoute><MapsPage /></ProtectedRoute>} />
                <Route path="/maps/:id" element={<ProtectedRoute><MapDetailPage /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
