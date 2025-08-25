import React from 'react';
import { Modal } from '@/resources/components';
import {
	ModalContent,
	ModalMessage,
	ModalActions,
	CancelButton,
	DeleteButton,
	CheckboxContainer,
	Checkbox,
	CheckboxLabel
} from './delete.conta.modal.style';

interface DeleteConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (deleteParcelas: boolean) => Promise<void>;
	title: string;
	message: string;
	itemName: string;
	hasParcelas?: boolean;
	confirmButtonText?: string;
	cancelButtonText?: string;
}

export default function DeleteConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	itemName,
	hasParcelas = false,
	confirmButtonText = 'Deletar',
	cancelButtonText = 'Cancelar'
}: DeleteConfirmationModalProps) {
	const [deleteParcelas, setDeleteParcelas] = React.useState(false);
	const [isDeleting, setIsDeleting] = React.useState(false);
	
	const handleConfirm = async () => {
		setIsDeleting(true);
		try {
			await onConfirm(deleteParcelas);
			onClose();
		} catch (error) {
			console.error('Erro ao deletar:', error);
		} finally {
			setIsDeleting(false);
		}
	};
	
	const handleClose = () => {
		if (!isDeleting) {
			setDeleteParcelas(false);
			onClose();
		}
	};
	
	return (
		<Modal isOpen={isOpen} onClose={handleClose} title={title} size="medium">
		<ModalContent>
		<ModalMessage>
		{message}
		<strong> {itemName}</strong>?
		</ModalMessage>
		
		{hasParcelas && (
			<CheckboxContainer>
			<Checkbox
			id="deleteParcelas"
			type="checkbox"
			checked={deleteParcelas}
			onChange={(e) => setDeleteParcelas(e.target.checked)}
			/>
			<CheckboxLabel htmlFor="deleteParcelas">
			Deletar também todas as parcelas desta conta
			</CheckboxLabel>
			</CheckboxContainer>
		)}
		
		<ModalActions>
			<CancelButton type="button" onClick={handleClose} disabled={isDeleting}>
				{cancelButtonText}
			</CancelButton>
			<DeleteButton type="button" onClick={handleConfirm} disabled={isDeleting}>
				{isDeleting ? 'Deletando...' : confirmButtonText}
			</DeleteButton>
		</ModalActions>
		</ModalContent>
		</Modal>
	);
}
