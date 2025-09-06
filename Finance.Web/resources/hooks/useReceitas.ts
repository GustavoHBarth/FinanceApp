import { useEffect, useMemo, useState } from 'react';
import api from '@/backend/api';
import type { ReceitaDTO } from '@/backend/dto.typegen/receita-dto';

export function useReceitas(selectedMonth: Date, page = 1, pageSize = 8, status?: string) {
    const [items, setItems] = useState<ReceitaDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const { start, end } = useMemo(() => {
        const s = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
        const e = new Date(s); e.setMonth(e.getMonth() + 1);
        const toLocalISODate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        return { start: toLocalISODate(s), end: toLocalISODate(e) };
    }, [selectedMonth]);

    const refetch = async () => {
        setLoading(true);
        try {
            const params = {
                page,
                pageSize,
                dateFrom: `${start}T00:00:00`,
                dateTo: `${end}T00:00:00`,
                sort: 'data_desc',
                ...(status ? { status } : {})
            } as const;
            const { data } = await api.get('/Receitas', { params });
            const payload = data?.data ?? null;
            setItems(payload?.items ?? []);
            setTotal(payload?.total ?? 0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, [start, end, page, pageSize, status]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    return { receitas: items, loading, refetch, total, totalPages };
}