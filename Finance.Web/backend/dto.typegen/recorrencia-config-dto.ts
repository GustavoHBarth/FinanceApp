/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { EnumRecorrencia } from "./enum-recorrencia";
import { DayOfWeek } from "./day-of-week";

export interface RecorrenciaConfigDTO {
    tipoRecorrencia: EnumRecorrencia;
    dataInicio: Date;
    dataFim: Date;
    diaDoMes: number;
    diaDaSemana: DayOfWeek;
    gerarOcorrenciaInicial: boolean;
}
