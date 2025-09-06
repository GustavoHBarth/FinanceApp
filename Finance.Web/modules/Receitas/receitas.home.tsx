import { IoMdAddCircle } from "react-icons/io"
import { useEffect, useState } from 'react'
import CreateReceitaModal from "./create.receita.modal/create.receita.modal"

import { Whapper, ReceitasHeader, NovaReceitaButton, ResumoReceitas, FilterReceitas, ReceitasTable, ReceitasMonth, ButtonPages } from "./receitas.home.style"
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline, IoEye } from "react-icons/io5"
import { useReceitas } from "@/resources/hooks/useReceitas";
import { useReceitasResumo } from "@/resources/hooks/UseReceitasResumo";
import { EnumCategoriaReceita } from "@/backend/dto.typegen/enum-categoria-receita";


export default function ReceitasPage() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const openCreate = () => setIsCreateOpen(true);
    const closeCreate = () => setIsCreateOpen(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [page, setPage] = useState(1);
    const pageSize = 7;
    const { receitas, loading: loadingLista, totalPages } = useReceitas(selectedMonth, page, pageSize);
    const { dashboard } = useReceitasResumo(selectedMonth);

    const changeMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedMonth);
        if (direction === 'prev') newDate.setMonth(newDate.getMonth() - 1);
        else newDate.setMonth(newDate.getMonth() + 1);
        setSelectedMonth(newDate);
    };

    useEffect(() => {
        setPage(1);
    }, [selectedMonth]);

    const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
    const formatDate = (s: string | Date) => (typeof s === 'string' ? new Date(s) : s).toLocaleDateString('pt-BR');
    const categoriaToString = (categoria: number | undefined | null) =>
        (typeof categoria === 'number' ? EnumCategoriaReceita[categoria] : undefined) ?? 'Desconhecida';

    return (
        <Whapper>
            <ReceitasHeader>
                <h1>Receitas</h1>
                <div className="add-btn">
                    <NovaReceitaButton onClick={openCreate}>
                        <IoMdAddCircle />
                        Nova Receita
                    </NovaReceitaButton>
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

            <FilterReceitas  />

            <ReceitasTable>
                <table className="receitas-table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingLista ? (
                        <tr><td colSpan={5}>Carregando...</td></tr>
                        ) : receitas.length > 0 ? (
                        receitas.map(r => (
                            <tr key={r.id}>
                                <td>{r.titulo}</td>
                                <td>{formatCurrency(r.valor)}</td>
                                <td>{formatDate(r.data)}</td>
                                <td>{categoriaToString(r.categoria)}</td>
                                <td className="actions">
                                    <button
                                        className="btn-edit"
                                        // criar modal edit
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn-delete"
                                        // criar modal delete
                                    >
                                        Excluir
                                    </button>
                                    <button
                                        className="btn-view"
                                        // criar modal view
                                    >
                                        <IoEye />
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                        <tr><td colSpan={5}>Nenhuma receita encontrada para este mês.</td></tr>
                        )}
                    </tbody>
                </table>
            </ReceitasTable>


            {totalPages > 1 && (
                <ButtonPages>
                    <div className="summary">
                        {`${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, totalPages * pageSize)} de ${totalPages * pageSize} resultados`}
                    </div>
                    <div className="pages">
                        <button className="button-pages" disabled={page === 1} onClick={() => setPage(1)}>«</button>
                        <button className="button-pages" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>‹</button>
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
                        <button className="button-pages" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>›</button>
                        <button className="button-pages" disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
                    </div>
                </ButtonPages>
            )}


            <CreateReceitaModal
                isOpen={isCreateOpen}
                onClose={closeCreate}
            />

        </Whapper>
    )
}