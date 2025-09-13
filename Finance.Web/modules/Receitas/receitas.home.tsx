import { IoMdAddCircle } from "react-icons/io"
import { useEffect, useState } from 'react'
import CreateReceitaModal from "./create.receita.modal/create.receita.modal"
import EditReceitaModal from "./edit.receita.modal/edit.receita.modal"
import ViewReceitaModal from "./view.receita.modal/view.receita.modal"

import { Whapper, ReceitasHeader, NovaReceitaButton, FiltroButton, ResumoReceitas, ReceitasTable, ReceitasMonth, ButtonPages } from "./receitas.home.style"
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline, IoEye, IoSearch } from "react-icons/io5"
import { useReceitas } from "@/resources/hooks/useReceitas";
import { usePaginationState } from "@/resources/hooks/usePaginationState";
import api from "@/backend/api";
import { useReceitasResumo } from "@/resources/hooks/UseReceitasResumo";
import { EnumCategoriaReceita } from "@/backend/dto.typegen/enum-categoria-receita";
import { useConfirm } from "@/resources/confirm/confirm.context";
import type { ReceitaDTO } from "@/backend/dto.typegen/receita-dto";


export default function ReceitasPage() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const openCreate = () => setIsCreateOpen(true);
    const closeCreate = () => setIsCreateOpen(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingReceita, setEditingReceita] = useState<ReceitaDTO | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [viewingReceita, setViewingReceita] = useState<ReceitaDTO | null>(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const { page, setPage, pageSize, setTotal, total, totalPages, previousPage, nextPage } = usePaginationState(1, 7);
    const { receitas, loading: loadingLista, total: receitasTotal, refetch, deleteReceita } = useReceitas(selectedMonth, page, pageSize);
    const { dashboard } = useReceitasResumo(selectedMonth);
    const { confirm } = useConfirm();

    const changeMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedMonth);
        if (direction === 'prev') newDate.setMonth(newDate.getMonth() - 1);
        else newDate.setMonth(newDate.getMonth() + 1);
        setSelectedMonth(newDate);
    };

    useEffect(() => {
        setPage(1);
    }, [selectedMonth]);

    useEffect(() => {
        setTotal(receitasTotal ?? 0);
    }, [receitasTotal]);

    const openDeleteModal = async (receita: ReceitaDTO) => {
        const ok = await confirm({
            title: 'Excluir Receita',
            message: `Tem certeza que deseja excluir "${receita.titulo}"?`
        });
        if (ok) {
            await deleteReceita(receita.id);
        }
    }

    const openEditModal = (receita: ReceitaDTO) => {
        setEditingReceita(receita);
        setIsEditOpen(true);
    };

    const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
    const formatDate = (s: string | Date) => (typeof s === 'string' ? new Date(s) : s).toLocaleDateString('pt-BR');
    const categoriaToString = (categoria: number | undefined | null) =>
        (typeof categoria === 'number' ? EnumCategoriaReceita[categoria] : undefined) ?? 'Desconhecida';

    const handleCreateReceita = async (data: any) => {
        try {
            const toLocalDateTime = (d: Date) => {
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                return `${yyyy}-${mm}-${dd}T00:00:00`;
            };

            const dataDate = (data.data instanceof Date ? data.data : new Date(data.data));
            const dataRecebimentoDate = (data.dataRecebimento instanceof Date ? data.dataRecebimento : new Date(data.dataRecebimento));

            const payload = {
                titulo: String(data.titulo ?? '').trim(),
                descricao: String(data.descricao ?? '').trim() || undefined,
                valor: Number(data.valor ?? 0),
                data: toLocalDateTime(dataDate),
                dataRecebimento: toLocalDateTime(dataRecebimentoDate),
                categoria: Number(data.categoria),
                status: Number(data.status),
                recorrencia: Number(data.recorrencia),
                numeroDocumento: String(data.numeroDocumento ?? '').trim() || undefined,
                contaBancariaId: String(data.contaBancariaId ?? '').trim() || undefined,
            } as const;
            const r = await api.post('/receitas', payload);
            if (r.status >= 200 && r.status < 300) {
                // Ajusta mês/página para garantir visibilidade imediata
                const createdMonth = dataDate.getMonth();
                const createdYear = dataDate.getFullYear();
                const currentMonth = selectedMonth.getMonth();
                const currentYear = selectedMonth.getFullYear();
                if (createdMonth !== currentMonth || createdYear !== currentYear) {
                    setSelectedMonth(new Date(createdYear, createdMonth, 1));
                } else {
                    setPage(1);
                    try { refetch(); } catch {}
                }
                return true;
            }
            return false;
        } catch (err) {
            console.error('Erro ao criar receita', err);
            return false;
        }
    };

    return (
        <Whapper>
            <ReceitasHeader>
                <h1>Receitas</h1>
                <div className="add-btn">
                    <NovaReceitaButton onClick={openCreate}>
                        <IoMdAddCircle />
                        Nova Receita
                    </NovaReceitaButton>

                    <FiltroButton>
                        <IoSearch />
                    </FiltroButton>
                </div>
            </ReceitasHeader>

            <ReceitasMonth>
                <button className="month-btn" onClick={() => changeMonth('prev')}>
                    <IoArrowBackCircleOutline />
                </button>

                <span className="month-display">
                    {selectedMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>

                <button className="month-btn" onClick={() => changeMonth('next')}>
                    <IoArrowForwardCircleOutline />
                </button>
            </ReceitasMonth>

            <ResumoReceitas>
                <div className="wrapper">
                    <div className="valor">
                        {dashboard ? formatCurrency(dashboard.totalMes) : '...'}
                    </div>
                    <div className="descricao">
                        Ganhos do Mês 
                    </div>
                </div>
                <div className="wrapper">
                    <div className="valor">
                        {dashboard?.maiorFonte ? categoriaToString(dashboard.maiorFonte.categoria) : '...'}
                    </div>
                    <div className="descricao">
                        Maior fonte de receita 
                    </div>
                </div>
                <div className="wrapper">
                    <div className="valor">
                        {dashboard ? formatCurrency(dashboard.previsaoAnual) : '...'}
                    </div>
                    <div className="descricao">
                        Precisão receita anual 
                    </div>
                </div>
            </ResumoReceitas>

            <ReceitasTable>
                <table className="receitas-table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingLista ? (
                        <tr><td colSpan={6}>Carregando...</td></tr>
                        ) : receitas.length > 0 ? (
                        receitas.map(r => (
                            <tr key={r.id}>
                                <td>{r.titulo}</td>
                                <td>{r.descricao || '-'}</td>
                                <td>{formatCurrency(r.valor)}</td>
                                <td>{formatDate(r.data)}</td>
                                <td>{categoriaToString(r.categoria)}</td>
                                <td className="actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => openEditModal(r)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => openDeleteModal(r)}
                                    >
                                        Excluir
                                    </button>
                                    <button
                                        className="btn-view"
                                        onClick={() => { setViewingReceita(r); setIsViewOpen(true); }}
                                    >
                                        <IoEye />
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                        <tr><td colSpan={6}>Nenhuma receita encontrada para este mês.</td></tr>
                        )}
                    </tbody>
                </table>
            </ReceitasTable>


            {totalPages > 1 && (
                <ButtonPages>
                    <div className="summary">
                        {`${total === 0 ? 0 : (page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} de ${total} resultados`}
                    </div>
                    <div className="pages">
                        <button className="button-pages" disabled={page === 1} onClick={() => setPage(1)}>«</button>
                        <button className="button-pages" disabled={page === 1} onClick={previousPage}>‹</button>
                        {Array.from({ length: totalPages }).map((_, i) => i + 1)
                            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                            .reduce<number[]>((acc, p) => {
                                if (acc.length === 0 || p - acc[acc.length - 1] === 1) acc.push(p); else acc.push(-1, p);
                                return acc;
                            }, [])
                            .map((p, idx) => p === -1 ? (
                                <span key={`e-${idx}`} className="ellipsis">…</span>
                            ) : (
                                <button
                                    key={p}
                                    className={`button-pages ${p === page ? 'active' : ''}`}
                                    onClick={() => setPage(p)}
                                >{p}</button>
                            ))}
                        <button className="button-pages" disabled={page === totalPages} onClick={nextPage}>›</button>
                        <button className="button-pages" disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
                    </div>
                </ButtonPages>
            )}


            <CreateReceitaModal
                isOpen={isCreateOpen}
                onClose={closeCreate}
                onSubmit={handleCreateReceita}
            />

            <EditReceitaModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                initialData={editingReceita}
                onSubmit={async (data: any) => {
                    if (!editingReceita) return false;
                    try {
                        const toLocalDateTime = (d: Date) => {
                            const yyyy = d.getFullYear();
                            const mm = String(d.getMonth() + 1).padStart(2, '0');
                            const dd = String(d.getDate()).padStart(2, '0');
                            return `${yyyy}-${mm}-${dd}T00:00:00`;
                        };

                        const dataDate = (data.data instanceof Date ? data.data : new Date(data.data));
                        const dataRecebimentoDate = (data.dataRecebimento instanceof Date ? data.dataRecebimento : new Date(data.dataRecebimento));

                        const payload = {
                            titulo: String(data.titulo ?? '').trim(),
                            descricao: String(data.descricao ?? '').trim() || undefined,
                            valor: Number(data.valor ?? 0),
                            data: toLocalDateTime(dataDate),
                            dataRecebimento: toLocalDateTime(dataRecebimentoDate),
                            categoria: Number(data.categoria),
                            status: Number(data.status),
                            recorrencia: Number(data.recorrencia),
                            numeroDocumento: String(data.numeroDocumento ?? '').trim() || undefined,
                            contaBancariaId: String(data.contaBancariaId ?? '').trim() || undefined,
                        } as const;

                        const r = await api.put(`/receitas/${editingReceita.id}`, payload);
                        if (r.status >= 200 && r.status < 300) {
                            const editedMonth = dataDate.getMonth();
                            const editedYear = dataDate.getFullYear();
                            const currentMonth = selectedMonth.getMonth();
                            const currentYear = selectedMonth.getFullYear();
                            if (editedMonth !== currentMonth || editedYear !== currentYear) {
                                setSelectedMonth(new Date(editedYear, editedMonth, 1));
                            } else {
                                try { await refetch(); } catch {}
                            }
                            return true;
                        }
                        return false;
                    } catch (err) {
                        console.error('Erro ao atualizar receita', err);
                        return false;
                    }
                }}
            />

            {isViewOpen && viewingReceita && (
                <ViewReceitaModal
                    isOpen={isViewOpen}
                    onClose={() => setIsViewOpen(false)}
                    receita={viewingReceita}
                    onEdit={openEditModal}
                />
            )}

        </Whapper>
    )
}