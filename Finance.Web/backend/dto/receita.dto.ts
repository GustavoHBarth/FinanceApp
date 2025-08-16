import { EnumCategoriaReceita, EnumRecorrencia, EnumStatusReceita } from "./enums.dto"
import { ApiResponse } from './common.dto'

// DTOs de receita baseados no ReceitaController e ReceitaDTO
export interface Receita {
  id: string // Guid do backend convertido para string
  titulo: string
  descricao?: string
  valor: number
  data: string
  dataRecebimento?: string
  categoria: EnumCategoriaReceita
  status: EnumStatusReceita
  recorrencia?: EnumRecorrencia
  numeroDocumento?: string
  contaBancariaId?: string // Guid do backend convertido para string
  createdAt: string
  updatedAt?: string
}

export interface CreateReceitaRequest {
  titulo: string
  descricao?: string
  valor: number
  data: string
  dataRecebimento?: string
  categoria: EnumCategoriaReceita
  status?: EnumStatusReceita // Adicionado para alinhar com backend
  recorrencia?: EnumRecorrencia
  numeroDocumento?: string
  contaBancariaId?: string // Guid do backend convertido para string
}

export interface UpdateReceitaRequest {
  titulo?: string
  descricao?: string
  valor?: number
  data?: string
  dataRecebimento?: string
  categoria?: EnumCategoriaReceita
  status?: EnumStatusReceita
  recorrencia?: EnumRecorrencia
  numeroDocumento?: string
  contaBancariaId?: string // Guid do backend convertido para string
}

// Respostas da API usando ApiResponse genérico
export interface ReceitaResponse extends ApiResponse<Receita> {}
export interface ReceitasResponse extends ApiResponse<Receita[]> {}
export interface DeleteReceitaResponse extends ApiResponse<null> {}
