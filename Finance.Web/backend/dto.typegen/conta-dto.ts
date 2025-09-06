/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { EnumCategoriaConta } from "./enum-categoria-conta";
import { EnumStatusConta } from "./enum-status-conta";
import { EnumRecorrencia } from "./enum-recorrencia";
import { ParcelaDTO } from "./parcela-dto";

export interface ContaDTO {
    id: string;
    titulo: string;
    descricao: string;
    valor: number;
    data: Date;
    dataVencimento: Date;
    categoria: EnumCategoriaConta;
    status: EnumStatusConta;
    recorrencia: EnumRecorrencia;
    numeroDocumento: string;
    contaBancariaId: string;
    createdAt: Date;
    updatedAt: Date;
    ehParcelado: boolean;
    totalParcelas: number;
    dataPrimeiraParcela: Date;
    parcelas: ParcelaDTO[];
}
