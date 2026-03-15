import { useState, useEffect } from 'react';

const STORAGE_EVENT = 'local-storage-update';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        const handleUpdate = (e: Event) => {
            const { key: updatedKey } = (e as CustomEvent<{ key: string }>).detail;
            if (updatedKey !== key) return;
            try {
                const item = window.localStorage.getItem(key);
                setStoredValue(item ? JSON.parse(item) : initialValue);
            } catch {}
        };

        window.addEventListener(STORAGE_EVENT, handleUpdate);
        return () => window.removeEventListener(STORAGE_EVENT, handleUpdate);
    }, [key]);

    const setValue = (value: T | ((prev: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
        } catch {
            console.error('Error saving to localStorage');
        }
    };

    return [storedValue, setValue] as const;
};
