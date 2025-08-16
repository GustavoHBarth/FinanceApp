// Enums baseados no backend C# - valores explícitos para corresponder ao banco
export enum EnumCategoriaConta {
  Outros = 0,
  Alimentacao = 1,
  Transporte = 2,
  Moradia = 3,
  Lazer = 4,
  Educacao = 5,
  Saude = 6,
  ContasDomesticas = 7
}

// Labels em português para exibição no frontend
export const CategoriaContaLabels: Record<EnumCategoriaConta, string> = {
  [EnumCategoriaConta.Outros]: 'Outros',
  [EnumCategoriaConta.Alimentacao]: 'Alimentação',
  [EnumCategoriaConta.Transporte]: 'Transporte',
  [EnumCategoriaConta.Moradia]: 'Moradia',
  [EnumCategoriaConta.Lazer]: 'Lazer',
  [EnumCategoriaConta.Educacao]: 'Educação',
  [EnumCategoriaConta.Saude]: 'Saúde',
  [EnumCategoriaConta.ContasDomesticas]: 'Contas Domésticas'
}

// Função para obter o label de uma categoria (aceita int ou enum)
export const getCategoriaLabel = (categoria: EnumCategoriaConta | number): string => {
  const enumValue = categoria as EnumCategoriaConta
  return CategoriaContaLabels[enumValue] || 'Outros'
}

// Array de opções para selector
export const CategoriaContaOptions = Object.entries(CategoriaContaLabels).map(([value, label]) => ({
  value: parseInt(value) as EnumCategoriaConta,
  label
}))

// Função para converter string para enum (útil para formulários)
export const getCategoriaFromString = (categoriaString: string): EnumCategoriaConta => {
  const entry = Object.entries(CategoriaContaLabels).find(([_, label]) => label === categoriaString)
  return entry ? parseInt(entry[0]) as EnumCategoriaConta : EnumCategoriaConta.Outros
}

export enum EnumCategoriaReceita {
  Salario = 'Salario',
  Bonus = 'Bonus',
  Investimentos = 'Investimentos',
  Freelance = 'Freelance',
  Outros = 'Outros'
}

export enum EnumStatusConta {
  Pendente = 0,
  Pago = 1,
  Vencido = 2,
  Cancelado = 3
}

// Labels em português para Status de Conta
export const StatusContaLabels: Record<EnumStatusConta, string> = {
  [EnumStatusConta.Pendente]: 'Pendente',
  [EnumStatusConta.Pago]: 'Pago',
  [EnumStatusConta.Vencido]: 'Vencido',
  [EnumStatusConta.Cancelado]: 'Cancelado'
}

// Array de opções para selector de Status
export const StatusContaOptions = Object.entries(StatusContaLabels).map(([value, label]) => ({
  value: parseInt(value) as EnumStatusConta,
  label
}))

export enum EnumStatusReceita {
  Pendente = 0,
  Recebido = 1,
  Cancelado = 2
}

export enum EnumRecorrencia {
  Unica = 0,
  Diaria = 1,
  Semanal = 2,
  Quinzenal = 3,
  Mensal = 4,
  Bimestral = 5,
  Trimestral = 6,
  Semestral = 7,
  Anual = 8
}

// Labels em português para Recorrência
export const RecorrenciaLabels: Record<EnumRecorrencia, string> = {
  [EnumRecorrencia.Unica]: 'Única',
  [EnumRecorrencia.Diaria]: 'Diária',
  [EnumRecorrencia.Semanal]: 'Semanal',
  [EnumRecorrencia.Quinzenal]: 'Quinzenal',
  [EnumRecorrencia.Mensal]: 'Mensal',
  [EnumRecorrencia.Bimestral]: 'Bimestral',
  [EnumRecorrencia.Trimestral]: 'Trimestral',
  [EnumRecorrencia.Semestral]: 'Semestral',
  [EnumRecorrencia.Anual]: 'Anual'
}

// Array de opções para selector de Recorrência
export const RecorrenciaOptions = Object.entries(RecorrenciaLabels).map(([value, label]) => ({
  value: parseInt(value) as EnumRecorrencia,
  label
}))
