// DTOs de parcela baseados no ParcelaController e ParcelaDTO
import { ApiResponse } from './common.dto'

export interface Parcela {
  id: string // Guid do backend convertido para string
  contaId: string // Guid do backend convertido para string
  numeroParcela: number
  totalParcelas: number
  valorParcela: number
  dataVencimento: string
  observacao?: string
  createdAt: string
  updatedAt?: string
}

export interface CreateParcelaRequest {
  contaId: string // Guid do backend convertido para string
  numeroParcela: number
  totalParcelas: number
  valorParcela: number
  dataVencimento: string
  observacao?: string
}

export interface UpdateParcelaRequest {
  valorParcela?: number
  dataVencimento?: string
  observacao?: string
}

// Respostas da API usando ApiResponse genérico
export interface ParcelaResponse extends ApiResponse<Parcela> {}
export interface ParcelasResponse extends ApiResponse<Parcela[]> {}
export interface DeleteParcelaResponse extends ApiResponse<null> {}
