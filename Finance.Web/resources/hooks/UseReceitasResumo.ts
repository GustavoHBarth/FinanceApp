import { useEffect, useMemo, useState } from 'react';
import api from '@/backend/api';

export function useReceitasResumo(selectedMonth: Date, status?: number | null) {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const { month, year } = useMemo(() => ({
        month: selectedMonth.getMonth() + 1,
        year: selectedMonth.getFullYear()
    }), [selectedMonth]);

    useEffect(() => {
        const ctrl = new AbortController();
        (async () => {
            setLoading(true);
            try {
                const params: Record<string, any> = { month, year };
                if (status !== undefined && status !== null) params.status = status;
                const res = await api.get('/resumo/receita', { params, signal: ctrl.signal });
                setData(res?.data?.data ?? null);
            } finally {
                setLoading(false);
            }
        })();
        return () => ctrl.abort();
    }, [month, year, status]);

    return { dashboard: data, loading };
}