// DTOs comuns para respostas da API - alinhados com o backend
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
  errors?: Record<string, string>
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
}
