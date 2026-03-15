import { Link } from 'react-router-dom';

interface Crumb {
    label: string;
    to?: string;
}

export const Breadcrumb = ({ crumbs }: { crumbs: Crumb[] }) => {
    return (
        <nav className="flex items-center gap-1 text-sm text-gray-400 mb-6">
            {crumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span>/</span>}
                    {crumb.to ? (
                        <Link to={crumb.to} className="hover:text-gray-700 transition-colors">
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className="text-gray-700 font-medium">{crumb.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
};
