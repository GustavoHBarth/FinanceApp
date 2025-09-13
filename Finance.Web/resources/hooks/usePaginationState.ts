import { useMemo, useState } from 'react';

export type PaginationState = {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
};

export type PaginationActions = {
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setTotal: (total: number) => void;
    resetPage: () => void;
    nextPage: () => void;
    previousPage: () => void;
};

export function usePaginationState(initialPage = 1, initialPageSize = 10): PaginationState & PaginationActions {
    const [page, setPage] = useState<number>(Math.max(1, Math.floor(initialPage)));
    const [pageSize, setPageSize] = useState<number>(Math.max(1, Math.floor(initialPageSize)));
    const [total, setTotal] = useState<number>(0);

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(total / pageSize || 1));
    }, [total, pageSize]);

    const resetPage = () => setPage(1);

    const nextPage = () => setPage(p => Math.min(p + 1, totalPages));
    const previousPage = () => setPage(p => Math.max(1, p - 1));

    return {
        page,
        pageSize,
        total,
        totalPages,
        setPage,
        setPageSize,
        setTotal,
        resetPage,
        nextPage,
        previousPage
    };
}


