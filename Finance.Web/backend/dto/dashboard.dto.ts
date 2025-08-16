// DTOs para dashboard e resumo mensal
import { Receita } from './receita.dto'
import { Conta } from './conta.dto'
import { ApiResponse } from './common.dto'

export interface DashboardMetrics {
  saldoAtual: number
  receitasMensal: number
  gastosMensal: number
  saldoAnterior: number
  variacaoPercentual: number
}

export interface ResumoMensal {
  mes: number
  ano: number
  receitas: Receita[]
  contas: Conta[]
  totalReceitas: number
  totalContas: number
  saldo: number
  categoriasReceitas: CategoriaResumo[]
  categoriasContas: CategoriaResumo[]
}

export interface CategoriaResumo {
  categoria: string
  valor: number
  quantidade: number
  percentual: number
}

export interface ResumoMensalRequest {
  mes: number
  ano: number
}

// Respostas da API usando ApiResponse genérico
export interface ResumoMensalResponse extends ApiResponse<ResumoMensal> {}
export interface DashboardResponse extends ApiResponse<DashboardMetrics> {}
