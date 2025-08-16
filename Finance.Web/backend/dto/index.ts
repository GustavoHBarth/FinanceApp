// Exporta todos os DTOs para facilitar o uso
export * from './common.dto'
export * from './enums.dto'
export * from './auth.dto'
export * from './conta.dto'
export * from './parcela.dto'
export * from './receita.dto'
export * from './dashboard.dto'

// Re-exporta tipos comuns para facilitar o uso
export type { 
  ApiResponse, 
  PaginationParams, 
  PaginatedResponse 
} from './common.dto'

export type { 
  User, 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest,
  AuthMeResponse,
  AuthLoginResponse,
  AuthRegisterResponse
} from './auth.dto'

export type { 
  Conta, 
  CreateContaRequest, 
  UpdateContaRequest,
  ContaResponse,
  ContasResponse,
  DeleteContaResponse
} from './conta.dto'

export type { 
  Parcela, 
  CreateParcelaRequest, 
  UpdateParcelaRequest,
  ParcelaResponse,
  ParcelasResponse,
  DeleteParcelaResponse
} from './parcela.dto'

export type { 
  Receita, 
  CreateReceitaRequest, 
  UpdateReceitaRequest,
  ReceitaResponse,
  ReceitasResponse,
  DeleteReceitaResponse
} from './receita.dto'

export type { 
  DashboardMetrics, 
  ResumoMensal, 
  CategoriaResumo,
  ResumoMensalRequest,
  ResumoMensalResponse,
  DashboardResponse
} from './dashboard.dto'
