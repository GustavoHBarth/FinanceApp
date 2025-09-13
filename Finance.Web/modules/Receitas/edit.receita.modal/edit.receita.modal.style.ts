import styled from 'styled-components'

export const Form = styled.form`
	padding: 0;
	max-height: 70vh;
	overflow-y: auto;
	padding-right: 8px;
	scrollbar-width: thin;
	scrollbar-color: var(--color-border) transparent;

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--color-border);
			border-radius: 4px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: var(--color-text-secondary);
		}
`;

export const FormSection = styled.div`
	margin-bottom: 24px;
	padding: 20px;
	background: var(--color-surface-2);
	border-radius: 8px;
	border: 1px solid var(--color-border);
`;

export const SectionTitle = styled.h3`
	margin: 0 0 16px 0;
	font-size: 18px;
	font-weight: 600;
	color: var(--color-text-primary);
	border-bottom: 1px solid var(--color-border);
	padding-bottom: 8px;
`;

export const FormRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	margin-bottom: 16px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

export const Field = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const Label = styled.label`
	margin-bottom: 6px;
	font-size: 14px;
	font-weight: 500;
	color: var(--color-text-secondary);
`;

export const Input = styled.input`
	padding: 10px 12px;
	border: 1px solid var(--color-border);
	border-radius: 6px;
	background: var(--color-surface-1);
	color: var(--color-text-primary);
	font-size: 14px;
	transition: border-color 0.2s ease;

	&:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
	}

	&::placeholder {
		color: var(--color-text-muted);
	}
`;

export const Select = styled.select`
	padding: 12px 14px;
	border: 1px solid var(--color-border);
	border-radius: 8px;
	background: var(--color-surface-1);
	color: var(--color-text-primary);
	font-size: 16px;

	&:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
	}
`;

export const Actions = styled.div`
	display: flex;
	gap: 12px;
	justify-content: flex-end;
	margin-top: 8px;
`;

export const CancelButton = styled.button`
	padding: 10px 18px;
	border: 1px solid var(--color-border);
	border-radius: 8px;
	background: var(--color-surface-1);
	color: var(--color-text-secondary);
	cursor: pointer;

	&:hover {
		background: var(--color-surface-2);
	}
`;

export const SubmitButton = styled.button`
	padding: 10px 18px;
	border: none;
	border-radius: 8px;
	background: var(--color-primary);
	color: white;
	cursor: pointer;

	&:hover {
		background: var(--color-primary-dark);
	}
`;
