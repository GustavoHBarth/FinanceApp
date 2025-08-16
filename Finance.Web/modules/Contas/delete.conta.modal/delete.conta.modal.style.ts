import styled from 'styled-components';

export const ModalContent = styled.div`
	padding: 16px;
`;

export const ModalTitle = styled.h2`
	margin: 0 0 16px 0;
	color: var(--color-text-primary);
	font-size: 20px;
	font-weight: 600;
`;

export const ModalMessage = styled.p`
	margin: 0 0 24px 0;
	color: var(--color-text-secondary);
	font-size: 16px;
	line-height: 1.5;

	strong {
		color: var(--color-text-primary);
		font-weight: 600;
	}
`;

export const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 24px;
	padding: 16px;
	background-color: var(--color-background-secondary);
	border-radius: 8px;
	border: 1px solid var(--color-border);
`;

export const Checkbox = styled.input`
	width: 20px;
	height: 20px;
	accent-color: var(--color-danger);
	cursor: pointer;
`;

export const CheckboxLabel = styled.label`
	color: var(--color-text-primary);
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	user-select: none;
`;

export const ModalActions = styled.div`
	display: flex;
	gap: 16px;
	justify-content: flex-end;
	margin-top: 16px;
`;

export const CancelButton = styled.button`
	padding: 12px 24px;
	border: 1px solid var(--color-border);
	background-color: transparent;
	color: var(--color-text-secondary);
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover:not(:disabled) {
		background-color: var(--color-background-secondary);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const DeleteButton = styled.button`
	padding: 12px 24px;
	border: none;
	background-color: var(--color-danger);
	color: white;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover:not(:disabled) {
		background-color: var(--color-danger-hover);
	}

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;
