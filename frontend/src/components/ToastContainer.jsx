import React from 'react';
import { useToast } from '../contexts/ToastContext';

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`max-w-sm px-4 py-2 rounded-md shadow-lg text-white flex items-center justify-between ${t.type === 'error' ? 'bg-red-500' : t.type === 'success' ? 'bg-green-500' : 'bg-gray-800'
                        }`}
                >
                    <div>{t.message}</div>
                    <button onClick={() => removeToast(t.id)} className="ml-4 font-bold">✕</button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
