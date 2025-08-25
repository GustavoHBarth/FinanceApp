import React, { useState, useEffect } from 'react';
import { Modal } from '@/resources/components';
import { UpdateContaRequest, EnumCategoriaConta, EnumStatusConta, EnumRecorrencia, CategoriaContaOptions, StatusContaOptions, RecorrenciaOptions, Conta } from '@/backend/dto';
import {
	FormContainer,
	FormSection,
	SectionTitle,
	FormRow,
	FormGroup,
	Label,
	Input,
	Select,
	CheckboxContainer,
	Checkbox,
	CheckboxLabel,
	ErrorMessage,
	FormActions,
	CancelButton,
	SubmitButton
} from './edit.conta.modal.style';

interface EditContaModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: UpdateContaRequest) => Promise<boolean>;
	conta: Conta | null;
}

export default function EditContaModal({ isOpen, onClose, onSubmit, conta }: EditContaModalProps) {
	const [formData, setFormData] = useState<UpdateContaRequest>({
		titulo: '',
		descricao: '',
		valor: 0,
		data: new Date().toISOString().split('T')[0],
		dataVencimento: '',
		categoria: EnumCategoriaConta.Outros,
		status: EnumStatusConta.Pendente,
		recorrencia: EnumRecorrencia.Unica,
		numeroDocumento: '',
		contaBancariaId: '',
		ehParcelado: false,
		totalParcelas: 1,
		dataPrimeiraParcela: ''
	});
	
	const [errors, setErrors] = useState<Record<string, string>>({});
	
	
	useEffect(() => {
		if (conta) {
			setFormData({
				titulo: conta.titulo || '',
				descricao: conta.descricao || '',
				valor: conta.valor || 0,
				data: conta.data ? new Date(conta.data).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				dataVencimento: conta.dataVencimento ? new Date(conta.dataVencimento).toISOString().split('T')[0] : '',
				categoria: conta.categoria || EnumCategoriaConta.Outros,
				status: conta.status || EnumStatusConta.Pendente,
				recorrencia: conta.recorrencia || EnumRecorrencia.Unica,
				numeroDocumento: conta.numeroDocumento || '',
				contaBancariaId: conta.contaBancariaId || '',
				ehParcelado: conta.ehParcelado || false,
				totalParcelas: conta.totalParcelas || 2,
				dataPrimeiraParcela: conta.dataPrimeiraParcela ? new Date(conta.dataPrimeiraParcela).toISOString().split('T')[0] : ''
			});
			setErrors({});
		}
	}, [conta]);
	
	const handleInputChange = (field: keyof UpdateContaRequest, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		
		if (errors[field]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};
	
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};
		
		if (!formData.titulo?.trim()) {
			newErrors.titulo = 'Título é obrigatório';
		}
		
		if (!formData.valor || formData.valor <= 0) {
			newErrors.valor = 'Valor deve ser maior que zero';
		}
		
		if (!formData.data) {
			newErrors.data = 'Data é obrigatória';
		}
		
		if (formData.ehParcelado && (!formData.totalParcelas || formData.totalParcelas < 2)) {
			newErrors.totalParcelas = 'Total de parcelas deve ser no mínimo 2';
		}
		
		if (formData.ehParcelado && !formData.dataPrimeiraParcela) {
			newErrors.dataPrimeiraParcela = 'Data da primeira parcela é obrigatória para contas parceladas';
		}
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (validateForm()) {
			setIsSubmitting(true);
			
			try {
				console.log('Modal: Chamando onSubmit com dados:', JSON.stringify(formData, null, 2));
				
				
				const dadosLimpos = {
					titulo: formData.titulo,
					descricao: formData.descricao?.trim() || undefined,
					valor: Number(formData.valor),
					data: formData.data,
					dataVencimento: formData.dataVencimento?.trim() || undefined,
					categoria: Number(formData.categoria),
					status: Number(formData.status) || EnumStatusConta.Pendente,
					recorrencia: Number(formData.recorrencia) || EnumRecorrencia.Unica,
					numeroDocumento: formData.numeroDocumento?.trim() || undefined,
					contaBancariaId: formData.contaBancariaId?.trim() || undefined,
					ehParcelado: Boolean(formData.ehParcelado),
					totalParcelas: formData.ehParcelado ? Number(formData.totalParcelas) : undefined,
					dataPrimeiraParcela: formData.ehParcelado ? formData.dataPrimeiraParcela : undefined
				};
				
				
				const dadosFinais: UpdateContaRequest = {
					titulo: dadosLimpos.titulo,
					valor: dadosLimpos.valor,
					data: dadosLimpos.data,
					categoria: dadosLimpos.categoria,
					status: dadosLimpos.status,
					recorrencia: dadosLimpos.recorrencia,
					ehParcelado: dadosLimpos.ehParcelado
				};
				
				
				if (dadosLimpos.descricao) dadosFinais.descricao = dadosLimpos.descricao;
				if (dadosLimpos.dataVencimento) dadosFinais.dataVencimento = dadosLimpos.dataVencimento;
				if (dadosLimpos.numeroDocumento) dadosFinais.numeroDocumento = dadosLimpos.numeroDocumento;
				if (dadosLimpos.contaBancariaId) dadosFinais.contaBancariaId = dadosLimpos.contaBancariaId;
				if (dadosLimpos.ehParcelado) {
					dadosFinais.totalParcelas = dadosLimpos.totalParcelas;
					dadosFinais.dataPrimeiraParcela = dadosLimpos.dataPrimeiraParcela;
				}
				
				console.log('Modal: Dados finais para envio:', JSON.stringify(dadosFinais, null, 2));
				
				const success = await onSubmit(dadosFinais);
				console.log('Modal: Resposta do onSubmit:', success);
				
				if (success) {
					onClose();
				}
			} catch (error) {
				console.error('Erro ao submeter formulário:', error);
			} finally {
				setIsSubmitting(false);
			}
		}
	};
	
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pt-BR', { 
			style: 'currency', 
			currency: 'BRL' 
		}).format(value);
	};
	
	const parseCurrency = (value: string) => {
		return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
	};
	
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Editar Conta"
			size="large"
		>
			<FormContainer onSubmit={handleSubmit}>
				<FormSection>
					<SectionTitle>Informações Básicas</SectionTitle>
					
					<FormRow>
						<FormGroup>
							<Label htmlFor="titulo">Título *</Label>
							<Input
								id="titulo"
								type="text"
								value={formData.titulo}
								onChange={(e) => handleInputChange('titulo', e.target.value)}
								placeholder="Ex: Conta de luz"
								error={!!errors.titulo}
							/>
							{errors.titulo && <ErrorMessage>{errors.titulo}</ErrorMessage>}
						</FormGroup>
					
						<FormGroup>
							<Label htmlFor="valor">Valor *</Label>
							<Input
								id="valor"
								type="text"
								value={formatCurrency(formData.valor || 0)}
								onChange={(e) => handleInputChange('valor', parseCurrency(e.target.value))}
								placeholder="R$ 0,00"
								error={!!errors.valor}
							/>
							{errors.valor && <ErrorMessage>{errors.valor}</ErrorMessage>}
						</FormGroup>
					</FormRow>
					
					<FormRow>
						<FormGroup>
							<Label htmlFor="descricao">Descrição</Label>
							<Input
								id="descricao"
								type="text"
								value={formData.descricao}
								onChange={(e) => handleInputChange('descricao', e.target.value)}
								placeholder="Descrição adicional (opcional)"
							/>
						</FormGroup>
					
						<FormGroup>
							<Label htmlFor="categoria">Categoria *</Label>
							<Select
								id="categoria"
								value={formData.categoria}
								onChange={(e) => handleInputChange('categoria', parseInt(e.target.value) as EnumCategoriaConta)}
							>
								{CategoriaContaOptions.map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</Select>
						</FormGroup>
					</FormRow>
					
					<FormRow>
						<FormGroup>
							<Label htmlFor="data">Data *</Label>
							<Input
								id="data"
								type="date"
								value={formData.data}
								onChange={(e) => handleInputChange('data', e.target.value)}
								error={!!errors.data}
							/>
							{errors.data && <ErrorMessage>{errors.data}</ErrorMessage>}
						</FormGroup>
					
						<FormGroup>
							<Label htmlFor="dataVencimento">Data de Vencimento</Label>
							<Input
								id="dataVencimento"
								type="date"
								value={formData.dataVencimento}
								onChange={(e) => handleInputChange('dataVencimento', e.target.value)}
								placeholder="Data de vencimento (opcional)"
							/>
						</FormGroup>
					</FormRow>
				</FormSection>
				
				<FormSection>
					<SectionTitle>Parcelamento</SectionTitle>
					
					<FormRow>
						<FormGroup>
							<CheckboxContainer>
								<Checkbox
									id="ehParcelado"
									type="checkbox"
									checked={formData.ehParcelado}
									onChange={(e) => handleInputChange('ehParcelado', e.target.checked)}
								/>
								<CheckboxLabel htmlFor="ehParcelado">
									Esta conta é parcelada
								</CheckboxLabel>
							</CheckboxContainer>
						</FormGroup>
					</FormRow>
					
					{formData.ehParcelado && (
						<FormRow>
							<FormGroup>
								<Label htmlFor="totalParcelas">Total de Parcelas</Label>
														<Input
							id="totalParcelas"
							type="number"
							min="2"
							value={formData.totalParcelas}
							onChange={(e) => handleInputChange('totalParcelas', parseInt(e.target.value))}
							error={!!errors.totalParcelas}
						/>
								{errors.totalParcelas && <ErrorMessage>{errors.totalParcelas}</ErrorMessage>}
							</FormGroup>
						
							<FormGroup>
								<Label htmlFor="dataPrimeiraParcela">Data da Primeira Parcela</Label>
								<Input
									id="dataPrimeiraParcela"
									type="date"
									value={formData.dataPrimeiraParcela}
									onChange={(e) => handleInputChange('dataPrimeiraParcela', e.target.value)}
									error={!!errors.dataPrimeiraParcela}
								/>
								{errors.dataPrimeiraParcela && <ErrorMessage>{errors.dataPrimeiraParcela}</ErrorMessage>}
							</FormGroup>
						</FormRow>
					)}
				</FormSection>
				
				<FormSection>
					<SectionTitle>Informações Adicionais</SectionTitle>
					
					<FormRow>
						<FormGroup>
							<Label htmlFor="numeroDocumento">Número do Documento</Label>
							<Input
								id="numeroDocumento"
								type="text"
								value={formData.numeroDocumento}
								onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
								placeholder="Número do documento (opcional)"
							/>
						</FormGroup>
					
						<FormGroup>
							<Label htmlFor="recorrencia">Recorrência</Label>
							<Select
								id="recorrencia"
								value={formData.recorrencia}
								onChange={(e) => handleInputChange('recorrencia', parseInt(e.target.value) as EnumRecorrencia)}
							>
								{RecorrenciaOptions.map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</Select>
						</FormGroup>
					</FormRow>
					
					<FormRow>
						<FormGroup>
							<Label htmlFor="status">Status</Label>
							<Select
								id="status"
								value={formData.status}
								onChange={(e) => handleInputChange('status', parseInt(e.target.value) as EnumStatusConta)}
							>
								{StatusContaOptions.map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</Select>
						</FormGroup>
					
						<FormGroup>
							<Label htmlFor="contaBancariaId">Conta Bancária</Label>
							<Input
								id="contaBancariaId"
								type="text"
								value={formData.contaBancariaId}
								onChange={(e) => handleInputChange('contaBancariaId', e.target.value)}
								placeholder="ID da conta bancária (opcional)"
							/>
						</FormGroup>
					</FormRow>
				</FormSection>
				
				<FormActions>
					<CancelButton type="button" onClick={onClose}>
						Cancelar
					</CancelButton>
					<SubmitButton type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Atualizando...' : 'Atualizar Conta'}
					</SubmitButton>
				</FormActions>
			</FormContainer>
		</Modal>
	);
}