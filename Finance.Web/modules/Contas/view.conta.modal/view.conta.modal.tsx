import { Conta, Parcela, getCategoriaLabel } from '@/backend/dto';
import {
    ModalOverlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalContent,
    ContaTitle,
    InfoGrid,
    InfoItem,
    InfoLabel,
    InfoValue,
    ParcelasSection,
    ParcelasTitle,
    ParcelasContainer,
    ParcelaItem,
    ParcelaInfo,
    ParcelaDetails,
    ModalActions,
    EditButton,
    CloseModalButton
} from './view.conta.modal.style';

interface ViewContaModalProps {
    isOpen: boolean;
    onClose: () => void;
    conta: Conta | null;
    onEdit: (conta: Conta) => void;
}

export default function ViewContaModal({ isOpen, onClose, conta, onEdit }: ViewContaModalProps) {
    if (!isOpen || !conta) return null;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const handleEdit = () => {
        onClose();
        onEdit(conta);
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>Detalhes da Conta</ModalTitle>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>

                <ModalContent>
                    <ContaTitle>{conta.titulo}</ContaTitle>

                    <InfoGrid>
                        <InfoItem>
                            <InfoLabel>Valor</InfoLabel>
                            <InfoValue>{formatCurrency(conta.valor)}</InfoValue>
                        </InfoItem>

                        <InfoItem>
                            <InfoLabel>Categoria</InfoLabel>
                            <InfoValue>{getCategoriaLabel(conta.categoria || 0)}</InfoValue>
                        </InfoItem>

                        <InfoItem>
                            <InfoLabel>Data de Vencimento</InfoLabel>
                            <InfoValue>
                                {conta.dataVencimento ? formatDate(conta.dataVencimento) : 'Não definida'}
                            </InfoValue>
                        </InfoItem>

                        <InfoItem>
                            <InfoLabel>Status</InfoLabel>
                            <InfoValue>{conta.ehParcelado ? 'Parcelada' : 'À vista'}</InfoValue>
                        </InfoItem>
                    </InfoGrid>

                    {conta.ehParcelado && conta.parcelas && conta.parcelas.length > 0 && (
                        <ParcelasSection>
                            <ParcelasTitle>Parcelas</ParcelasTitle>
                            <ParcelasContainer>
                                {conta.parcelas
                                    .sort((a: Parcela, b: Parcela) => 
                                        new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime()
                                    )
                                    .map((parcela: Parcela) => (
                                        <ParcelaItem key={parcela.id}>
                                            <ParcelaInfo>
                                                Parcela {parcela.numeroParcela}/{parcela.totalParcelas}
                                            </ParcelaInfo>
                                            <ParcelaDetails>
                                                {formatCurrency(parcela.valorParcela)} - {formatDate(parcela.dataVencimento)}
                                            </ParcelaDetails>
                                        </ParcelaItem>
                                    ))}
                            </ParcelasContainer>
                        </ParcelasSection>
                    )}

                    <ModalActions>
                        <EditButton onClick={handleEdit}>
                            Editar Conta
                        </EditButton>
                        <CloseModalButton onClick={onClose}>
                            Fechar
                        </CloseModalButton>
                    </ModalActions>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );
}
