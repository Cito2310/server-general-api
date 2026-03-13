import { useState } from 'react'
import GameCanvas from './components/GameCanvas'

const GamePage = () => {
    const [showUnderground, setShowUnderground] = useState(true)
    const [digMode, setDigMode] = useState(false)

    return (
        <div className="w-full h-screen overflow-hidden bg-black">
            <GameCanvas showUnderground={showUnderground} digMode={digMode} />
            <div className="fixed bottom-4 left-4 flex gap-2">
                <button
                    onClick={() => setShowUnderground(v => !v)}
                    className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded cursor-pointer hover:bg-gray-700"
                >
                    {showUnderground ? 'Ocultar grilla' : 'Mostrar grilla'}
                </button>
                <button
                    onClick={() => setDigMode(v => !v)}
                    className={`text-white text-sm px-3 py-1.5 rounded cursor-pointer ${
                        digMode ? 'bg-amber-700 hover:bg-amber-600' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                >
                    {digMode ? 'Excavando...' : 'Excavar'}
                </button>
            </div>
        </div>
    )
}

export default GamePage
