import styled from 'styled-components';

export const FilterContainer = styled.div`
	width: 100%;
	margin-bottom: 24px;
`;

export const SearchBar = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	margin-bottom: 16px;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: stretch;
	}
`;

export const SearchInput = styled.input`
	flex: 1;
	padding: 12px 16px;
	border: 1px solid var(--color-border);
	border-radius: 8px;
	background: var(--color-surface-1);
	color: var(--color-text-primary);
	font-size: 16px;
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

export const AdvancedFiltersButton = styled.button<{ $isActive: boolean }>`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 12px 20px;
	border: 1px solid ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-border)'};
	border-radius: 8px;
	background: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-surface-1)'};
	color: ${props => props.$isActive ? 'white' : 'var(--color-text-secondary)'};
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	white-space: nowrap;

	&:hover {
		background: ${props => props.$isActive ? 'var(--color-primary-dark)' : 'var(--color-surface-2)'};
		border-color: ${props => props.$isActive ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)'};
	}

	svg {
		font-size: 16px;
	}
`;

export const AdvancedFiltersSection = styled.div`
	padding: 20px;
	background: var(--color-surface-1);
	border-radius: 12px;
	border: 1px solid var(--color-border);
	animation: slideDown 0.3s ease-out;

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const SectionTitle = styled.h3`
	margin: 0 0 16px 0;
	font-size: 18px;
	font-weight: 600;
	color: var(--color-text-primary);
	border-bottom: 1px solid var(--color-border);
	padding-bottom: 8px;
`;

export const FilterRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	margin-bottom: 16px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

export const FilterGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Label = styled.label`
	margin-bottom: 6px;
	font-size: 14px;
	font-weight: 500;
	color: var(--color-text-secondary);
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

export const DateRangeContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	margin-bottom: 16px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

export const DateInput = styled.input`
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

	&::-webkit-calendar-picker-indicator {
		filter: invert(1);
		cursor: pointer;
	}
`;

export const FilterActions = styled.div`
	display: flex;
	gap: 12px;
	justify-content: flex-end;
	padding-top: 20px;
	border-top: 1px solid var(--color-border);

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: stretch;
	}
`;

export const ClearButton = styled.button`
	padding: 10px 20px;
	border: 1px solid var(--color-border);
	border-radius: 6px;
	background: var(--color-surface-1);
	color: var(--color-text-secondary);
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: var(--color-surface-2);
		border-color: var(--color-text-secondary);
	}
`;

export const ResetButton = styled.button`
	padding: 10px 20px;
	border: 1px solid var(--color-warning);
	border-radius: 6px;
	background: var(--color-surface-1);
	color: var(--color-warning);
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: var(--color-warning);
		color: white;
	}
`;

export const ApplyButton = styled.button`
	padding: 10px 20px;
	border: none;
	border-radius: 6px;
	background: var(--color-primary);
	color: white;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background: var(--color-primary-dark);
	}

	&:disabled {
		background: var(--color-text-muted);
		cursor: not-allowed;
	}
`;
