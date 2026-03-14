import { useState, useCallback } from 'react'
import GameCanvas from './components/GameCanvas'
import ExtractionHUD from './components/ExtractionHUD'
import { STARTING_BALANCE, INCOME_PER_BARREL, COST_DIG, COST_DERRICK, COST_PER_PX } from './systems/economy'
import type { GameMode, Derrick, Pipe, OilBag } from './game.types'

const GamePage = () => {
    const [showUnderground, setShowUnderground] = useState(true)
    const [mode, setMode] = useState<GameMode>(null)
    const [derricks, setDerricks] = useState<Derrick[]>([])
    const [pipes, setPipes] = useState<Pipe[]>([])
    const [oilBags, setOilBags] = useState<OilBag[]>([])
    const [balance, setBalance] = useState(STARTING_BALANCE)

    const toggleMode = (m: GameMode) => setMode(prev => prev === m ? null : m)

    const handleOilBagsChange = useCallback((bags: OilBag[]) => {
        setOilBags(bags)
    }, [])

    const handleSpend = useCallback((amount: number) => {
        setBalance(prev => prev - amount)
    }, [])

    const handleOilExtracted = useCallback((barrels: number) => {
        setBalance(prev => prev + Math.floor(barrels * INCOME_PER_BARREL))
    }, [])

    const activeBtn = 'bg-amber-700 hover:bg-amber-600 text-white text-sm px-3 py-1.5 rounded cursor-pointer'
    const idleBtn = 'bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-1.5 rounded cursor-pointer'
    const disabledBtn = 'bg-gray-800 opacity-40 text-white text-sm px-3 py-1.5 rounded cursor-not-allowed'

    const canAffordDig = balance >= COST_DIG
    const canAffordDerrick = balance >= COST_DERRICK
    const canAffordPipe = balance >= Math.round(1 * COST_PER_PX)

    return (
        <div className="w-full h-screen overflow-hidden bg-black">
            <GameCanvas
                showUnderground={showUnderground}
                mode={mode}
                balance={balance}
                derricks={derricks}
                pipes={pipes}
                onAddDerrick={d => setDerricks(prev => [...prev, d])}
                onAddPipe={p => setPipes(prev => [...prev, p])}
                onSpend={handleSpend}
                onOilExtracted={handleOilExtracted}
                onOilBagsChange={handleOilBagsChange}
            />
            <ExtractionHUD oilBags={oilBags} />
            <div className="fixed bottom-4 left-4 flex gap-2 items-center">
                <div className="bg-gray-900 border border-gray-700 text-amber-400 font-bold text-sm px-3 py-1.5 rounded">
                    ${balance.toLocaleString()}
                </div>
                <button
                    onClick={() => setShowUnderground(v => !v)}
                    className={idleBtn}
                >
                    {showUnderground ? 'Ocultar grilla' : 'Mostrar grilla'}
                </button>
                <button
                    onClick={() => canAffordDig && toggleMode('dig')}
                    className={mode === 'dig' ? activeBtn : canAffordDig ? idleBtn : disabledBtn}
                    title={`Costo: $${COST_DIG} por triángulo`}
                >
                    Excavar ${COST_DIG}
                </button>
                <button
                    onClick={() => canAffordDerrick && toggleMode('place-derrick')}
                    className={mode === 'place-derrick' ? activeBtn : canAffordDerrick ? idleBtn : disabledBtn}
                    title={`Costo: $${COST_DERRICK}`}
                >
                    Torre ${COST_DERRICK}
                </button>
                <button
                    onClick={() => canAffordPipe && toggleMode('place-pipe')}
                    className={mode === 'place-pipe' ? activeBtn : canAffordPipe ? idleBtn : disabledBtn}
                    title={`Costo: $${COST_PER_PX}/px`}
                >
                    Tubería
                </button>
            </div>
        </div>
    )
}

export default GamePage
