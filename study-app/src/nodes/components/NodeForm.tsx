import { useNodeForm } from '../hooks/useNodeForm';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import type { Node } from '../../types';

interface Props {
    node?: Node;
    parentLabel?: string;
    onSave: (label: string, content: string, contentMode: 'inline' | 'block') => void;
    onClose: () => void;
}

export const NodeForm = ({ node, parentLabel, onSave, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        errors,
        isValid,
        content,
        contentMode,
        title,
        onSubmit,
        setContentMode,
    } = useNodeForm({ node, parentLabel, onSave, onClose });

    return (
        <Modal title={title} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    label="Title"
                    placeholder="E.g.: Definition"
                    autoFocus
                    {...register('label', { required: true, validate: v => !!v.trim() })}
                />
                {errors.label && <p className="text-red-500 text-sm">Title is required</p>}

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Content <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                        placeholder="Description or node content..."
                        rows={4}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                        {...register('content')}
                    />
                </div>

                {content.trim() && (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Display content</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setContentMode('inline')}
                                className={`flex-1 py-2 px-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                                    contentMode === 'inline'
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                Inline
                            </button>
                            <button
                                type="button"
                                onClick={() => setContentMode('block')}
                                className={`flex-1 py-2 px-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                                    contentMode === 'block'
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                Below
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={!isValid}>Save</Button>
                </div>
            </form>
        </Modal>
    );
};
