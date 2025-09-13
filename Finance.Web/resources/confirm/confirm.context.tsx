import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from 'react';
import Modal from '@/resources/components/Modal';

type ConfirmOptions = {
    title?: string;
    message?: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
};

type ConfirmContextData = {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextData | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({});
    const resolverRef = useRef<((value: boolean) => void) | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const confirm = useCallback((opts: ConfirmOptions) => {
        setOptions(opts);
        setIsOpen(true);
        return new Promise<boolean>((resolve) => {
            resolverRef.current = resolve;
        });
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        resolverRef.current?.(false);
        resolverRef.current = null;
        setIsSubmitting(false);
    }, []);

    const handleConfirm = useCallback(async () => {
        try {
            setIsSubmitting(true);
            resolverRef.current?.(true);
        } finally {
            setIsSubmitting(false);
            setIsOpen(false);
            resolverRef.current = null;
        }
    }, []);

    const value = useMemo(() => ({ confirm }), [confirm]);

    return (
        <ConfirmContext.Provider value={value}>
            {children}
            <Modal isOpen={isOpen} onClose={handleClose} title={options.title ?? 'Confirmação'}>
                <div style={{ padding: 16 }}>
                    {typeof options.message === 'string' ? <p>{options.message}</p> : options.message}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                        <button onClick={handleClose} disabled={isSubmitting}>
                            {options.cancelText ?? 'Cancelar'}
                        </button>
                        <button onClick={handleConfirm} disabled={isSubmitting} style={{ background: '#e11d48', color: '#fff', padding: '6px 12px', borderRadius: 6 }}>
                            {isSubmitting ? 'Confirmando...' : (options.confirmText ?? 'Confirmar')}
                        </button>
                    </div>
                </div>
            </Modal>
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const ctx = useContext(ConfirmContext);
    if (!ctx) throw new Error('useConfirm deve ser usado dentro de ConfirmProvider');
    return ctx;
}


