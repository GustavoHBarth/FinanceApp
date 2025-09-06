import { useState } from "react"
import { ContasHeader, ContasMonth, ContasTable, ResumoContas, Whapper, NovaContaButton } from "./contas.home.style"
import { useNavigate } from "react-router-dom"
import { IoMdAddCircle } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'

import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5"
import { useContas } from "@/resources/hooks/useContas";
import { Conta, Parcela, getCategoriaLabel, UpdateContaRequest } from "@/backend/dto";
import CreateContaModal from "./create.conta.modal/create.conta.modal";
import DeleteConfirmationModal from "./delete.conta.modal/delete.conta.modal";
import EditContaModal from "./edit.conta.modal/edit.conta.modal";
import ViewContaModal from "./view.conta.modal";
import FilterConta, { FilterContaData } from "./filter.conta/filter.conta";

export default function ContasPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterContaData>({})
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    conta: Conta | null;
  }>({
    isOpen: false,
    conta: null
  })
  const [editModalState, setEditModalState] = useState<{
    isOpen: boolean;
    conta: Conta | null;
  }>({
    isOpen: false,
    conta: null
  })
  const [viewModalState, setViewModalState] = useState<{
    isOpen: boolean;
    conta: Conta | null;
  }>({
    isOpen: false,
    conta: null
  })
  const navigate = useNavigate()

  const { contas, createConta, creating, deleteConta, updateConta } = useContas()

    const changeMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedMonth)
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1)
        } else {
            newDate.setMonth(newDate.getMonth() + 1)
        }
        setSelectedMonth(newDate)
    }

      const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  


  const openDeleteModal = (conta: Conta) => {
    setDeleteModalState({
      isOpen: true,
      conta
    })
  }

  const closeDeleteModal = () => {
    setDeleteModalState({
      isOpen: false,
      conta: null
    })
  }

  const handleDeleteConta = async (deleteParcelas: boolean) => {
    if (deleteModalState.conta) {
      const success = await deleteConta(deleteModalState.conta.id, deleteParcelas)
      if (success) {
        closeDeleteModal()
      }
    }
  }

  const openEditModal = (conta: Conta) => {
    setEditModalState({
      isOpen: true,
      conta
    })
  }

  const closeEditModal = () => {
    setEditModalState({
      isOpen: false,
      conta: null
    })
  }

  const openViewModal = (conta: Conta) => {
    setViewModalState({
      isOpen: true,
      conta
    })
  }

  const closeViewModal = () => {
    setViewModalState({
      isOpen: false,
      conta: null
    })
  }

  const handleEditConta = async (data: UpdateContaRequest): Promise<boolean> => {
    if (editModalState.conta) {
      const success = await updateConta(editModalState.conta.id, data)
      if (success) {
        closeEditModal()
      }
      return success
    }
    return false
  }

  const handleApplyFilters = (filters: FilterContaData) => {
    setActiveFilters(filters)
  }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR')
    }

    const applyFilters = (contas: Conta[]) => {
        if (Object.keys(activeFilters).length === 0) return contas
        
        return contas.filter(conta => {
            if (activeFilters.titulo && !conta.titulo.toLowerCase().includes(activeFilters.titulo.toLowerCase())) {
                return false
            }
            
            if (activeFilters.categoria !== undefined) {
                if (activeFilters.categoria === 0) {
                    if (conta.categoria !== 0 && conta.categoria !== undefined && conta.categoria !== null) {
                        return false
                    }
                } else {
                    if (conta.categoria !== activeFilters.categoria) {
                        return false
                    }
                }
            }
            
            if (activeFilters.dataInicio && new Date(conta.data) < new Date(activeFilters.dataInicio)) {
                return false
            }
            
            if (activeFilters.dataFim && new Date(conta.data) > new Date(activeFilters.dataFim)) {
                return false
            }
            
            return true
        })
    }

    const generateTableRows = (contas: Conta[], month: number, year: number) => {
        const rows: Array<{ conta: Conta; parcela?: Parcela; isParcela: boolean }> = []
        
        contas.forEach(conta => {
            if (conta.ehParcelado && conta.parcelas && conta.parcelas.length > 0) {
                const parcelasDoMes = conta.parcelas.filter(parcela => {
                    const parcelaDate = new Date(parcela.dataVencimento)
                    return parcelaDate.getMonth() === month && parcelaDate.getFullYear() === year
                })
                
                if (parcelasDoMes.length > 0) {
                    parcelasDoMes.forEach(parcela => {
                        rows.push({ conta, parcela, isParcela: true })
                    })
                }
            } else {
                if (conta.dataVencimento) {
                    const contaDate = new Date(conta.dataVencimento)
                    if (contaDate.getMonth() === month && contaDate.getFullYear() === year) {
                        rows.push({ conta, isParcela: false })
                    }
                } else {
                    const contaDate = new Date(conta.data)
                    if (contaDate.getMonth() === month && contaDate.getFullYear() === year) {
                        rows.push({ conta, isParcela: false })
                    }
                }
            }
        })
        
        return rows
    }

    const filteredContas = applyFilters(contas)
    const tableRows = generateTableRows(filteredContas, selectedMonth.getMonth(), selectedMonth.getFullYear())
    
    const calculateMonthTotals = () => {
        let totalContas = 0
        let totalParcelas = 0
        let contasParceladas = 0
        const contasParceladasIds = new Set<string>()
        const categoriaGastos: Record<number, number> = {}
        
        tableRows.forEach(row => {
            if (row.isParcela && row.parcela) {
                totalParcelas++
                totalContas += row.parcela.valorParcela
                
                contasParceladasIds.add(row.conta.id)
                
                if (row.conta.categoria !== undefined) {
                    categoriaGastos[row.conta.categoria] = (categoriaGastos[row.conta.categoria] || 0) + row.parcela.valorParcela
                }
            } else {
                totalContas += row.conta.valor
                
                if (row.conta.categoria !== undefined) {
                    categoriaGastos[row.conta.categoria] = (categoriaGastos[row.conta.categoria] || 0) + row.conta.valor
                }
            }
        })
        
        contasParceladas = contasParceladasIds.size
        
        let categoriaMaisGastos = { categoria: 0, valor: 0 }
        Object.entries(categoriaGastos).forEach(([categoria, valor]) => {
            if (valor > categoriaMaisGastos.valor) {
                categoriaMaisGastos = { categoria: parseInt(categoria), valor }
            }
        })
        
        return { 
            totalContas, 
            totalParcelas, 
            contasParceladas,
            categoriaMaisGastos
        }
    }

    const { totalContas, contasParceladas, categoriaMaisGastos } = calculateMonthTotals()

    return (
        <Whapper>
            <ContasHeader>
                <h1>Despesas</h1>
                <div className="btn-icons">
                    <NovaContaButton 
                        onClick={openModal} 
                        disabled={creating}
                    >
                        {creating ? (
                            <span>...</span>
                        ) : (
                            <>
                                <IoMdAddCircle />
                                Nova Conta
                            </>
                        )}
                    </NovaContaButton>
                </div>
            </ContasHeader>

            <ContasMonth>
                <button className="month-btn" onClick={() => changeMonth('prev')}>
                    <IoArrowBackCircleOutline />
                </button>

                <span className="month-display">
                    {selectedMonth.toLocaleDateString('pt-BR', {
                        month: 'long',
                        year: 'numeric'
                    })}
                </span>

                <button className="month-btn" onClick={() => changeMonth('next')}>
                    <IoArrowForwardCircleOutline />
                </button>
            </ContasMonth>

            <ResumoContas>   
                    <div className="wrapper">
                        <div className="valor">
                            {formatCurrency(totalContas)}
                        </div>
                        <div className="descricao">
                            Gastos do Mês
                        </div>
                    </div>
                    
                    {contasParceladas > 0 && (
                        <div className="wrapper">
                            <div className="valor">
                                {contasParceladas}
                            </div>
                            <div className="descricao">
                                {contasParceladas === 1 ? 'Conta parcelada' : 'Contas parceladas'} em andamento
                            </div>
                        </div>
                    )}
                    
                    {categoriaMaisGastos.valor > 0 && (
                        <div className="wrapper">
                            <div className="valor">
                                {getCategoriaLabel(categoriaMaisGastos.categoria)}
                            </div>
                            <div className="descricao">
                                Categoria com maior gasto
                            </div>
                        </div>
                    )}
            </ResumoContas>

            <FilterConta
                onApply={handleApplyFilters}
                currentFilters={activeFilters}
            />
                
            <ContasTable>
                <table className="contas-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Parcela</th>
                            <th>Valor da Parcela</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows && tableRows.length > 0 ? (
                            tableRows.map((row) => (
                                <tr key={`${row.conta.id}-${row.isParcela ? row.parcela?.id : 'main'}`}>
                                    <td>
                                        <div>
                                            <div>{row.conta.titulo}</div>
                                        </div>
                                    </td>
                                    <td >
                                        {row.isParcela && row.parcela ? (
                                            <span>
                                                {row.parcela.numeroParcela}/{row.parcela.totalParcelas}
                                            </span>
                                        ) : (
                                            <span className="the-view">À vista</span>
                                        )}
                                    </td>
                                    <td >
                                        {row.isParcela && row.parcela ? (
                                            formatCurrency(row.parcela.valorParcela)
                                        ) : (
                                            formatCurrency(row.conta.valor)
                                        )}
                                    </td>
                                    <td>
                                        {row.conta.categoria !== undefined && row.conta.categoria !== null ? (
                                            <span>
                                                {getCategoriaLabel(row.conta.categoria)}
                                            </span>
                                        ) : (
                                            <span>{getCategoriaLabel(0)}</span>
                                        )}
                                    </td>
                                    <td>
                                        {formatDate(row.conta.createdAt)}
                                    </td>
                                    <td className="actions">
                                        <button 
                                          className="btn-edit"
                                          onClick={() => openEditModal(row.conta)}
                                        >
                                          Editar
                                        </button>
                                        <button 
                                          className="btn-delete" 
                                          onClick={() => openDeleteModal(row.conta)}
                                        >
                                          Excluir
                                        </button>
                                        <button 
                                          className="btn-view"
                                          onClick={() => openViewModal(row.conta)}
                                          title="Visualizar conta"
                                        >
                                          <IoEye />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>
                                    <span className="empty">Nenhuma conta ou parcela encontrada para este mês.</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </ContasTable>

            <CreateContaModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={async (data) => {
                    console.log('Página: Recebendo dados do modal:', data);
                    const result = await createConta(data);
                    console.log('Página: Resultado da criação:', result);
                    return result;
                }}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalState.isOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteConta}
                title="Excluir Conta"
                message="Tem certeza que deseja excluir a conta"
                itemName={deleteModalState.conta?.titulo || ''}
                hasParcelas={deleteModalState.conta?.ehParcelado || false}
                confirmButtonText="Excluir"
                cancelButtonText="Cancelar"
            />

            <EditContaModal
                isOpen={editModalState.isOpen}
                onClose={closeEditModal}
                onSubmit={handleEditConta}
                conta={editModalState.conta}
            />

            {viewModalState.isOpen && viewModalState.conta && (
                <ViewContaModal
                    isOpen={viewModalState.isOpen}
                    onClose={closeViewModal}
                    conta={viewModalState.conta}
                    onEdit={openEditModal}
                />
            )}
        </Whapper>
    )
}