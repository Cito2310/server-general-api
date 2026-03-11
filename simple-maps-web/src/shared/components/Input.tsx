type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
    error?: string
}

const Input = ({ label, error, ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                {...props}
                className={`
                    w-full px-4 py-2.5 rounded-lg border bg-white text-gray-900
                    text-sm outline-none transition-colors
                    placeholder:text-gray-400
                    ${error
                        ? 'border-gray-500 focus:border-gray-900'
                        : 'border-gray-300 focus:border-gray-900'
                    }
                `}
            />
            {error && (
                <span className="text-xs text-gray-500">{error}</span>
            )}
        </div>
    )
}

export default Input
