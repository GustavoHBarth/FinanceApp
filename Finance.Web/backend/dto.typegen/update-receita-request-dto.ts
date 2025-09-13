/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { EnumCategoriaReceita } from "./enum-categoria-receita";
import { EnumStatusReceita } from "./enum-status-receita";

export interface UpdateReceitaRequestDTO {
    titulo: string;
    descricao: string;
    valor: number;
    data: Date;
    dataRecebimento: Date;
    categoria: EnumCategoriaReceita;
    status: EnumStatusReceita;
    numeroDocumento: string;
    contaBancariaId: string;
}
