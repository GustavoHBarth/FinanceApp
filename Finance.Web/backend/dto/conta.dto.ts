// DTOs de conta baseados no ContaController e ContaDTO
import { Parcela } from './parcela.dto'
import { EnumCategoriaConta, EnumStatusConta, EnumRecorrencia } from './enums.dto'
import { ApiResponse } from './common.dto'

export interface Conta {
  id: string // Guid do backend convertido para string
  titulo: string
  descricao?: string
  valor: number
  data: string
  dataVencimento?: string
  categoria: EnumCategoriaConta
  status: EnumStatusConta
  recorrencia?: EnumRecorrencia
  numeroDocumento?: string
  contaBancariaId?: string // Guid do backend convertido para string
  createdAt: string
  updatedAt?: string
  
  // Propriedades calculadas e relacionamentos
  ehParcelado: boolean
  totalParcelas?: number
  dataPrimeiraParcela?: string
  parcelas: Parcela[]
}

export interface CreateContaRequest {
  titulo: string
  descricao?: string
  valor: number
  data: string
  dataVencimento?: string
  categoria: EnumCategoriaConta
  status?: EnumStatusConta // Adicionado para alinhar com backend
  recorrencia?: EnumRecorrencia
  numeroDocumento?: string
  contaBancariaId?: string // Guid do backend convertido para string
  
  // Propriedades de parcelamento simplificadas
  ehParcelado: boolean
  totalParcelas?: number
  dataPrimeiraParcela?: string
}

export interface UpdateContaRequest {
  titulo?: string
  descricao?: string
  valor?: number
  data?: string
  dataVencimento?: string
  categoria?: EnumCategoriaConta
  status?: EnumStatusConta
  recorrencia?: EnumRecorrencia
  numeroDocumento?: string
  contaBancariaId?: string // Guid do backend convertido para string
  
  // Propriedades de parcelamento simplificadas
  ehParcelado?: boolean
  totalParcelas?: number
  dataPrimeiraParcela?: string
}

// Respostas da API usando ApiResponse genérico
export interface ContaResponse extends ApiResponse<Conta> {}
export interface ContasResponse extends ApiResponse<Conta[]> {}
export interface DeleteContaResponse extends ApiResponse<null> {}
