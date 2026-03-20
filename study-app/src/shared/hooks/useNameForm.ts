import { useForm } from 'react-hook-form';

interface FormValues {
    name: string;
}

interface Options {
    defaultName?: string;
    onSave: (name: string) => void;
    onClose: () => void;
}

export const useNameForm = ({ defaultName = '', onSave, onClose }: Options) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
        defaultValues: { name: defaultName },
        mode: 'onChange',
    });

    const onSubmit = ({ name }: FormValues) => {
        onSave(name.trim());
        onClose();
    };

    return { register, handleSubmit, errors, isValid, onSubmit };
};
