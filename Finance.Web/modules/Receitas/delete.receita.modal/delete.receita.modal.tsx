import Modal  from "@/resources/components/Modal"
import { useState } from "react";
import { ModalMessage, ModalActions, DeleteButton } from "./delete.receita.modal.style";

interface DeleteReceitaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<boolean> | boolean;
    titulo: string;
}

export default function DeleteReceitaModal({ isOpen, onClose, onConfirm, titulo } : DeleteReceitaModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = async () => {
        try {
            setIsSubmitting(true);
            const ok = await onConfirm();
            if (ok) onClose();
        }
        catch (error) {
            console.error('Erro ao deletar receita:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Excluir Receita">
                <ModalMessage>
                    <p>Tem certeza que deseja deletar a receita? </p>
                    <strong>{titulo}</strong>
                </ModalMessage>
                <ModalActions>
                    <DeleteButton type="button" onClick={handleConfirm} disabled={isSubmitting}>
                        {isSubmitting ? 'Deletando...' : 'Deletar'}
                    </DeleteButton>
                </ModalActions>
            
        </Modal>
    )
}