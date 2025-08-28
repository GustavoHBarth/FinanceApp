import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	size?: 'small' | 'medium' | 'large' | 'full';
	showCloseButton?: boolean;
	closeOnOverlayClick?: boolean;
	closeOnEscape?: boolean;
	className?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	size = 'medium',
	showCloseButton = true,
	closeOnOverlayClick = true,
	closeOnEscape = true,
	className
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		if (!isOpen) return;
		
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && closeOnEscape) {
				onClose();
			}
		};
		
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				closeOnOverlayClick
			) {
				onClose();
			}
		};
		
		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);
		
		
		document.body.style.overflow = 'hidden';
		
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose, closeOnEscape, closeOnOverlayClick]);
	
	if (!isOpen) return null;
	
	return (
		<ModalOverlay>
		<ModalContainer ref={modalRef} size={size} className={className}>
		{title && (
			<ModalHeader>
			<ModalTitle>{title}</ModalTitle>
			{showCloseButton && (
				<CloseButton onClick={onClose} aria-label="Fechar modal">
				<IoClose size={24} />
				</CloseButton>
			)}
			</ModalHeader>
		)}
		
		{!title && showCloseButton && (
			<CloseButtonAbsolute onClick={onClose} aria-label="Fechar modal">
			<IoClose size={24} />
			</CloseButtonAbsolute>
		)}
		
		<ModalContent>
		{children}
		</ModalContent>
		</ModalContainer>
		</ModalOverlay>
	);
};

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--color-overlay);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	padding: 20px;
	backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div<{ size: ModalProps['size'] }>`
	background: var(--color-surface-1);
	border: 1px solid var(--color-border);
	border-radius: 12px;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
	position: relative;
	max-height: 90vh;
	overflow: hidden;
	animation: modalSlideIn 0.3s ease-out;

	${({ size }) => {
		switch (size) {
			case 'small':
			return 'width: 400px; max-width: 90vw;';
			case 'medium':
			return 'width: 600px; max-width: 90vw;';
			case 'large':
			return 'width: 800px; max-width: 90vw;';
			case 'full':
			return 'width: 95vw; height: 95vh;';
			default:
			return 'width: 600px; max-width: 90vw;';
		}
}}

@keyframes modalSlideIn {
	from {
		opacity: 0;
		transform: translateY(-20px) scale(0.95);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}
`;

const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 24px;
	border-bottom: 1px solid var(--color-border);
	background: var(--color-surface-2);
`;

const ModalTitle = styled.h2`
	margin: 0;
	font-size: 1.25rem;
	font-weight: 600;
	color: var(--color-text-primary);
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 8px;
	border-radius: 6px;
	color: var(--color-text-muted);
	transition: all 0.2s ease;

	&:hover {
		background-color: var(--color-surface-1);
		color: var(--color-text-secondary);
	}

	&:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}
`;

const CloseButtonAbsolute = styled(CloseButton)`
	position: absolute;
	top: 16px;
	right: 16px;
	z-index: 10;
	background: var(--color-surface-1);
	border: 1px solid var(--color-border);
	backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
	padding: 24px;
	overflow-y: auto;
	max-height: calc(90vh - 120px);
	color: var(--color-text-primary);
`;

export default Modal;
