import styled from 'styled-components';

export const FormContainer = styled.form`
	padding: 0;
	max-height: 70vh;
	overflow-y: auto;
	padding-right: 8px;

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

	scrollbar-width: thin;
	scrollbar-color: var(--color-border) transparent;
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

export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Label = styled.label`
	margin-bottom: 6px;
	font-size: 14px;
	font-weight: 500;
	color: var(--color-text-secondary);
`;

export const Input = styled.input<{ error?: boolean }>`
	padding: 10px 12px;
	border: 1px solid ${props => props.error ? 'var(--color-danger)' : 'var(--color-border)'};
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
`;

export const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 8px;
`;

export const Checkbox = styled.input`
	width: 18px;
	height: 18px;
	accent-color: var(--color-primary);
`;

export const CheckboxLabel = styled.label`
	margin: 0;
	font-size: 14px;
	color: var(--color-text-secondary);
	cursor: pointer;
`;

export const ErrorMessage = styled.span`
	margin-top: 4px;
	font-size: 12px;
	color: var(--color-danger);
`;

export const FormActions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 12px;
	margin-top: 24px;
	padding-top: 20px;
	border-top: 1px solid var(--color-border);
`;

export const CancelButton = styled.button`
	padding: 10px 20px;
	border: 1px solid var(--color-border);
	border-radius: 6px;
	background: var(--color-surface-1);
	color: var(--color-text-primary);
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background: var(--color-surface-2);
	}
`;

export const SubmitButton = styled.button`
	padding: 10px 20px;
	border: none;
	border-radius: 6px;
	background: var(--color-primary);
	color: var(--color-primary-contrast);
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background: var(--color-primary-hover);
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
	}
`;
