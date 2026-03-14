import type { OilBag } from '../game.types'

interface Props {
    oilBags: OilBag[]
}

const ExtractionHUD = ({ oilBags }: Props) => {
    const touched = oilBags.filter(b => b.totalOil !== b.remainingOil || b.extracting)
    const totalExtracted = oilBags.reduce((sum, b) => sum + (b.totalOil - b.remainingOil), 0)

    if (touched.length === 0) return null

    return (
        <div className="fixed top-4 right-4 bg-gray-900 border border-gray-700 text-white text-xs p-3 rounded w-56 flex flex-col gap-2">
            <div className="text-amber-400 font-bold text-sm">Extracción</div>
            <div className="text-gray-300">
                Total extraído: <span className="text-white font-medium">{Math.floor(totalExtracted)} bbl</span>
            </div>
            <div className="flex flex-col gap-2 mt-1">
                {touched.map(bag => {
                    const pct = bag.remainingOil / bag.totalOil
                    const label = bag.remainingOil <= 0
                        ? 'Vacía'
                        : bag.extracting
                            ? 'Extrayendo...'
                            : 'Detectada'
                    return (
                        <div key={bag.id}>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-400">Bolsa #{bag.id}</span>
                                <span className={bag.remainingOil <= 0 ? 'text-gray-500' : 'text-amber-400'}>
                                    {label}
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 h-1.5 rounded overflow-hidden">
                                <div
                                    className="h-1.5 rounded bg-amber-500 transition-all duration-500"
                                    style={{ width: `${pct * 100}%` }}
                                />
                            </div>
                            <div className="text-right text-gray-500 mt-0.5">
                                {Math.floor(bag.remainingOil)} / {bag.totalOil} bbl
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExtractionHUD
