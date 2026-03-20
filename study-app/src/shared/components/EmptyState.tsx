interface Props {
    title: string;
    subtitle?: string;
}

export const EmptyState = ({ title, subtitle }: Props) => {
    return (
        <div className="text-center py-16 text-gray-400">
            <p className="text-lg">{title}</p>
            {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
        </div>
    );
};
