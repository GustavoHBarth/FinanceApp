/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { EnumCategoriaReceita } from "./enum-categoria-receita";
import { EnumStatusReceita } from "./enum-status-receita";
import { EnumRecorrencia } from "./enum-recorrencia";

export interface ReceitaDTO {
    id: string;
    titulo: string;
    descricao: string;
    valor: number;
    data: Date;
    dataRecebimento: Date;
    categoria: EnumCategoriaReceita;
    status: EnumStatusReceita;
    recorrencia: EnumRecorrencia;
    numeroDocumento: string;
    contaBancariaId: string;
    createdAt: Date;
    updatedAt: Date;
}
