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
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 24px;
	background: var(--color-surface-1);
	border-radius: 12px;
	border: 1px solid var(--color-border);
`;

export const SectionTitle = styled.h3`
	margin: 0 0 8px 0;
	color: var(--color-text-primary);
	font-size: 18px;
	font-weight: 600;
`;

export const FormRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const Label = styled.label`
	color: var(--color-text-primary);
	font-size: 14px;
	font-weight: 500;
`;

export const Input = styled.input<{ error?: boolean }>`
	padding: 12px;
	border: 1px solid ${props => props.error ? 'var(--color-danger)' : 'var(--color-border)'};
	border-radius: 8px;
	background: var(--color-surface-2);
	color: var(--color-text-primary);
	font-size: 14px;
	transition: border-color 0.2s ease;

	&:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px var(--color-primary-alpha);
	}

	&::placeholder {
		color: var(--color-text-secondary);
	}
`;

export const Select = styled.select`
	padding: 12px;
	border: 1px solid var(--color-border);
	border-radius: 8px;
	background: var(--color-surface-2);
	color: var(--color-text-primary);
	font-size: 14px;
	cursor: pointer;
	transition: border-color 0.2s ease;

	&:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px var(--color-primary-alpha);
	}

	option {
		background: var(--color-surface-2);
		color: var(--color-text-primary);
	}
`;

export const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px;
	background: var(--color-surface-2);
	border-radius: 8px;
	border: 1px solid var(--color-border);
`;

export const Checkbox = styled.input`
	width: 20px;
	height: 20px;
	accent-color: var(--color-primary);
	cursor: pointer;
`;

export const CheckboxLabel = styled.label`
	color: var(--color-text-primary);
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	user-select: none;
`;

export const ErrorMessage = styled.span`
	color: var(--color-danger);
	font-size: 12px;
	margin-top: 4px;
`;

export const FormActions = styled.div`
	display: flex;
	gap: 16px;
	justify-content: flex-end;
	padding: 16px 0;
	border-top: 1px solid var(--color-border);
`;

export const CancelButton = styled.button`
	padding: 12px 24px;
	border: 1px solid var(--color-border);
	background: transparent;
	color: var(--color-text-secondary);
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background: var(--color-surface-2);
	}
`;

export const SubmitButton = styled.button`
	padding: 12px 24px;
	border: none;
	background: var(--color-primary);
	color: white;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover:not(:disabled) {
		background: var(--color-primary-hover);
	}

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;
