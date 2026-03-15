interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ title, onClose, children }: ModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 cursor-pointer text-xl leading-none"
                    >
                        ×
                    </button>
                </div>
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
};
