import styled from 'styled-components';

export const ModalMessage = styled.div`
    margin: 0 0 24px 0;
	color: var(--color-text-secondary);
	font-size: 16px;
	line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap: 8px;

	strong {
		color: var(--color-text-primary);
		font-weight: 600;
	}
`;

export const ModalActions = styled.div`
    display: flex;
	gap: 16px;
	justify-content: flex-end;
	margin-top: 16px;
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
