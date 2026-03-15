interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md';
}

export const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) => {
    const base = 'cursor-pointer font-medium rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-gray-900 text-white hover:bg-gray-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
    };

    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
};
