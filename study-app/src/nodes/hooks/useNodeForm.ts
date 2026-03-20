import { useForm, useWatch } from 'react-hook-form';
import type { Node } from '../../types';

export interface NodeFormValues {
    label: string;
    content: string;
    contentMode: 'inline' | 'block';
}

interface Options {
    node?: Node;
    parentLabel?: string;
    onSave: (label: string, content: string, contentMode: 'inline' | 'block') => void;
    onClose: () => void;
}

export const useNodeForm = ({ node, parentLabel, onSave, onClose }: Options) => {
    const { register, handleSubmit, control, setValue, formState: { errors, isValid } } = useForm<NodeFormValues>({
        defaultValues: {
            label: node?.label ?? '',
            content: node?.content ?? '',
            contentMode: node?.contentMode ?? 'block',
        },
        mode: 'onChange',
    });

    const content = useWatch({ control, name: 'content' });
    const contentMode = useWatch({ control, name: 'contentMode' });

    const title = node ? 'Editar Nodo' : parentLabel ? `Agregar hijo a "${parentLabel}"` : 'Nuevo Nodo Raíz';

    const onSubmit = ({ label, content, contentMode }: NodeFormValues) => {
        onSave(label.trim(), content.trim(), contentMode);
        onClose();
    };

    const setContentMode = (mode: 'inline' | 'block') => setValue('contentMode', mode);

    return {
        register,
        handleSubmit,
        errors,
        isValid,
        content,
        contentMode,
        title,
        onSubmit,
        setContentMode,
    };
};
