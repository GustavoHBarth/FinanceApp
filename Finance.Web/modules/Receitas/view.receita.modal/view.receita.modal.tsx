import Modal  from "@/resources/components/Modal";
import { EnumCategoriaReceita } from "@/backend/dto.typegen/enum-categoria-receita";
import { ReceitaDTO } from "@/backend/dto.typegen/receita-dto";
import { Whapper, SectionUp, InfoGrid, InfoItem, SectionTitle, SectionDown, Actions, EditButton } from "./view.receita.modal.style"
import { EnumRecorrencia, Receita } from "@/backend/dto";
import { EnumStatusReceita } from "@/backend/dto.typegen/enum-status-receita";

interface ViewReceitaModalProps {
    isOpen: boolean;
    onClose: () => void;
    receita: ReceitaDTO;
    onEdit: (receita: ReceitaDTO) => void; 
}

export default function ViewReceitaModal({ isOpen, onClose, receita, onEdit }: ViewReceitaModalProps) {
    const formatCurrency = (v?: number | null) => {
        if (v === undefined || v === null) return '-';
        try { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v)); } catch { return String(v); }
    };

    const formatDate = (s?: string | Date | null) => {
        if (!s) return '-';
        const d = typeof s === 'string' ? new Date(s) : s;
        if (Number.isNaN(d.getTime())) return '-';
        return d.toLocaleDateString('pt-BR');
    };

    const enumToText = (e: any, value: any, fallback = '-') => {
        try {
            return typeof value === 'number' ? (e[value] ?? fallback) : (e[String(value)] ?? fallback);
        } catch { return fallback; }
    };

    const handleEdit = () => {
        onClose();
        onEdit(receita);
    };


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={receita.titulo}
            size="medium"
        >
            {!receita ? (
                <div style={{ padding: 12 }}>Sem dados.</div>
            ) : (
                <Whapper>
                    <SectionUp>
                        <InfoGrid>
                            <InfoItem>
                                <dt>Descrição</dt>
                                <dd>{receita.descricao || '-'}</dd>
                            </InfoItem>

                            <InfoItem>
                                <dt>Valor</dt>
                                <dd>{formatCurrency(receita.valor)}</dd>
                            </InfoItem>

                            <InfoItem>
                                <dt>Data</dt>
                                <dd>
                                    {receita.data ? (
                                        <time dateTime={new Date(receita.data).toISOString()}>
                                            {formatDate(receita.data)}
                                        </time>
                                    ) : '-'}
                                </dd>
                            </InfoItem>

                            <InfoItem>
                                <dt>Data recebimento</dt>
                                <dd>
                                    {receita.dataRecebimento ? (
                                        <time dateTime={new Date(receita.dataRecebimento).toISOString()}>
                                            {formatDate(receita.dataRecebimento)}
                                        </time>
                                    ) : '-'}
                                </dd>
                            </InfoItem>

                            <InfoItem>
                                <dt>Categoria</dt>
                                <dd>{enumToText(EnumCategoriaReceita as any, receita.categoria, 'Desconhecida')}</dd>
                            </InfoItem>
                        </InfoGrid>
                    </SectionUp>

                    <SectionTitle/> 

                    <SectionDown>
                        <InfoGrid>
                            <InfoItem>
                                <dt>Recorrencia</dt>        
                                <dd>{enumToText(EnumRecorrencia as any, receita.recorrencia, 'Não informado')}</dd>   
                            </InfoItem>     

                            <InfoItem>
                                <dt>Numero do Documento</dt>        
                                <dd>{receita.numeroDocumento || '-'}</dd>   
                            </InfoItem>   

                            <InfoItem>
                                <dt>Status</dt>        
                                <dd>{enumToText(EnumStatusReceita as any, receita.status, 'Não informado')}</dd>   
                            </InfoItem>           
                        </InfoGrid>                
                    </SectionDown>

                    <Actions>
                        <EditButton onClick={handleEdit}>
                            Editar
                        </EditButton>
                    </Actions>
                </Whapper>
            )}
        </Modal>
    );
}