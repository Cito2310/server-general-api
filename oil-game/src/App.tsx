import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GamePage from './game/GamePage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/game" element={<GamePage />} />
                <Route path="*" element={<Navigate to="/game" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
