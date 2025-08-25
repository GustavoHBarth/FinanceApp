import React, { useState } from 'react';
import { EnumCategoriaConta, CategoriaContaOptions } from '@/backend/dto';
import { IoFilter } from 'react-icons/io5';
import {
	FilterContainer,
	SearchBar,
	SearchInput,
	AdvancedFiltersButton,
	AdvancedFiltersSection,
	SectionTitle,
	FilterRow,
	FilterGroup,
	Label,
	Select,
	DateRangeContainer,
	DateInput,
	FilterActions,
	ClearButton,
	ApplyButton,
	ResetButton
} from './filter.conta.style';

export interface FilterContaData {
	categoria?: EnumCategoriaConta;
	dataInicio?: string;
	dataFim?: string;
	titulo?: string;
}

interface FilterContaProps {
	onApply: (filters: FilterContaData) => void;
	currentFilters?: FilterContaData;
}

export default function FilterConta({ onApply, currentFilters }: FilterContaProps) {
	const [filterData, setFilterData] = useState<FilterContaData>(currentFilters || {
		categoria: undefined,
		dataInicio: '',
		dataFim: '',
		titulo: ''
	});
	const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

	const handleInputChange = (field: keyof FilterContaData, value: any) => {
		setFilterData(prev => ({ ...prev, [field]: value }));
	};

	const handleSearchChange = (value: string) => {
		handleInputChange('titulo', value);
		// Aplicar filtro de título em tempo real
		onApply({ ...filterData, titulo: value });
	};

	const handleApplyFilters = () => {
		// Remove campos vazios/undefined antes de aplicar
		const cleanFilters = Object.fromEntries(
			Object.entries(filterData).filter(([_, value]) => 
				value !== undefined && value !== '' && value !== null
			)
		) as FilterContaData;
		
		onApply(cleanFilters);
	};

	const handleClearFilters = () => {
		setFilterData({
			categoria: undefined,
			dataInicio: '',
			dataFim: '',
			titulo: ''
		});
		onApply({});
	};

	const handleResetFilters = () => {
		handleClearFilters();
		setShowAdvancedFilters(false);
	};

	const toggleAdvancedFilters = () => {
		setShowAdvancedFilters(!showAdvancedFilters);
	};

	return (
		<FilterContainer>
			<SearchBar>
				<SearchInput
					type="text"
					placeholder="Buscar por título da conta..."
					value={filterData.titulo || ''}
					onChange={(e) => handleSearchChange(e.target.value)}
				/>
				<AdvancedFiltersButton 
					onClick={toggleAdvancedFilters}
					$isActive={showAdvancedFilters}
				>
					<IoFilter />
					Filtros Avançados
				</AdvancedFiltersButton>
			</SearchBar>

			{showAdvancedFilters && (
				<AdvancedFiltersSection>
					<SectionTitle>Filtros Avançados</SectionTitle>
					
					<FilterRow>
						<FilterGroup>
							<Label>Categoria</Label>
							<Select
								value={filterData.categoria || ''}
								onChange={(e) => handleInputChange('categoria', e.target.value ? parseInt(e.target.value) : undefined)}
							>
								<option value="">Todas as categorias</option>
								{CategoriaContaOptions.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</Select>
						</FilterGroup>
					</FilterRow>

					<DateRangeContainer>
						<FilterGroup>
							<Label>Data Início</Label>
							<DateInput
								type="date"
								value={filterData.dataInicio || ''}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('dataInicio', e.target.value)}
							/>
						</FilterGroup>
						
						<FilterGroup>
							<Label>Data Fim</Label>
							<DateInput
								type="date"
								value={filterData.dataFim || ''}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('dataFim', e.target.value)}
							/>
						</FilterGroup>
					</DateRangeContainer>

					<FilterActions>
						<ClearButton onClick={handleClearFilters}>
							Limpar
						</ClearButton>
						<ResetButton onClick={handleResetFilters}>
							Resetar
						</ResetButton>
						<ApplyButton onClick={handleApplyFilters}>
							Aplicar Filtros
						</ApplyButton>
					</FilterActions>
				</AdvancedFiltersSection>
			)}
		</FilterContainer>
	);
}
