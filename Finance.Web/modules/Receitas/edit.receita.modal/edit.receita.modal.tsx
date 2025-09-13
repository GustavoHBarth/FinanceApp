import React, { useState, useEffect } from 'react';
import { Modal } from '@/resources/components';
import type { ReceitaDTO } from '@/backend/dto.typegen/receita-dto';
import { UpdateReceitaRequestDTO } from '@/backend/dto.typegen/update-receita-request-dto';
import { EnumCategoriaReceita } from '@/backend/dto.typegen/enum-categoria-receita';
import { EnumStatusReceita } from '@/backend/dto.typegen/enum-status-receita';
import { EnumRecorrencia } from '@/backend/dto.typegen/enum-recorrencia';
import { Form, FormSection, SectionTitle, FormRow, Field, Actions, SubmitButton } from "./edit.receita.modal.style"
import { InputSelector, InputCurrency, InputText, InputDate } from "@/resources/components/Inputs";

interface EditReceitaModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: ReceitaDTO | null;
    onSubmit?: (data: UpdateReceitaRequestDTO) => Promise<boolean> | boolean;
}

export default function EditReceitaModal({ isOpen, onClose, initialData, onSubmit}: EditReceitaModalProps) {

    const [formData, setFormData] = useState<UpdateReceitaRequestDTO>({
        titulo: '',
        descricao: '',
        valor: 0,
        data: new Date(),
        dataRecebimento: new Date(),
        categoria: EnumCategoriaReceita.Outros,
        status: EnumStatusReceita.Pendente,
        recorrencia: EnumRecorrencia.Unica,
        numeroDocumento: '',
        contaBancariaId: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        if (!initialData) return;
        try {
            setFormData({
                titulo: initialData.titulo ?? '',
                descricao: initialData.descricao ?? '',
                valor: Number(initialData.valor ?? 0),
                data: new Date(initialData.data),
                dataRecebimento: initialData.dataRecebimento ? new Date(initialData.dataRecebimento as any) : new Date(initialData.data),
                categoria: initialData.categoria ?? EnumCategoriaReceita.Outros,
                status: initialData.status ?? EnumStatusReceita.Pendente,
                recorrencia: (initialData.recorrencia ?? EnumRecorrencia.Unica) as EnumRecorrencia,
                numeroDocumento: initialData.numeroDocumento ?? '',
                contaBancariaId: initialData.contaBancariaId ? String(initialData.contaBancariaId) : ''
            });
            setErrors({});
        } catch {}
    }, [isOpen, initialData]);

    const handleInputChange = (field: keyof UpdateReceitaRequestDTO, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as string]) {
            setErrors(prev => {
                const n = { ...prev };
                delete n[field as string];
                return n;
            });
        }
    };

    const isValidDate = (d: any) => d instanceof Date && !Number.isNaN(d.getTime());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};
        if (!formData.titulo?.trim()) newErrors.titulo = 'Título é obrigatório';
        if (formData.valor === undefined || formData.valor === null || Number(formData.valor) <= 0) newErrors.valor = 'Informe um valor maior que 0';
        if (!isValidDate(formData.data)) newErrors.data = 'Data inválida';
        if (!isValidDate(formData.dataRecebimento)) newErrors.dataRecebimento = 'Data de recebimento inválida';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!onSubmit) {
            onClose();
            return;
        }

        try {
            setIsSubmitting(true);
            const ok = await onSubmit(formData);
            if (ok) onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const categoryOptions = [
        { value: EnumCategoriaReceita.Outros, title: 'Outros' },
        { value: EnumCategoriaReceita.Salario, title: 'Salario' },
        { value: EnumCategoriaReceita.Bonus, title: 'Bonus' },
        { value: EnumCategoriaReceita.Investimentos, title: 'Investimentos' },
        { value: EnumCategoriaReceita.Freelance, title: 'Freelance' }
    ];

    const recurrenceOptions = [
        { value: EnumRecorrencia.Anual, title: 'Anual' },
        { value: EnumRecorrencia.Diaria, title: 'Diária' },
        { value: EnumRecorrencia.Semanal, title: 'Semanal' },
        { value: EnumRecorrencia.Quinzenal, title: 'Quinzenal' },
        { value: EnumRecorrencia.Mensal, title: 'Mensal' },
        { value: EnumRecorrencia.Bimestral, title: 'Bimestral' },
        { value: EnumRecorrencia.Trimestral, title: 'Trimestral' },
        { value: EnumRecorrencia.Semestral, title: 'Semestral' },
        { value: EnumRecorrencia.Anual, title: 'Anual' }
    ];

    const statusOptions = [
        { value: EnumStatusReceita.Pendente, title: 'Pendente' },
        { value: EnumStatusReceita.Recebido, title: 'Recebido' },
        { value: EnumStatusReceita.Cancelado, title: 'Cancelado' }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar Receita"
            size="large"
        >
            <Form onSubmit={handleSubmit}>
                <SectionTitle>Informações Básicas</SectionTitle>
                <FormSection>
                    <FormRow>
                        <Field>
                            <InputText
                                label="Título"
                                name="titulo"
                                placeholder="Ex. Salário"
                                value={formData.titulo}
                                onValueChange={(v) => handleInputChange('titulo', v)}
                                required
                                error={errors?.titulo}
                            />
                        </Field>
                           
                        <Field>
                            <InputText
                                label="Descrição"
                                name="descricao"
                                id="descricao"
                                value={formData.descricao}
                                onValueChange={(v) => handleInputChange('descricao', v)}
                                placeholder="Descrição adicional (opcional)"
                            />
                        </Field>

                        <Field>
                            <InputCurrency
                                label="Valor"
                                name="valor"
                                value={formData.valor}
                                onValueChange={(n) => handleInputChange('valor', n)}
                                prefix="R$"
                                min={0}
                                required
                                error={errors?.valor}
                            />
                        </Field>

                        <Field>
                            <InputSelector
                                label="Categoria"
                                initialValue={formData.categoria}
                                options={categoryOptions}
                                cb={(newOption) => handleInputChange('categoria', Number(newOption) as EnumCategoriaReceita)}
                                required
                                error={errors?.categoria}
                            />
                        </Field>

                        <Field>
                            <InputDate
                                label="Data"
                                name="data"
                                value={formData.data}
                                onValueChange={(d) => handleInputChange('data', d)}
                                min={new Date(2020, 0, 1)}
                                max={new Date(2030, 11, 31)}
                                required
                                error={errors?.data}
                            />
                        </Field>

                        <Field>
                            <InputDate
                                label="Data Recebimento"
                                name="dataRecebimento"
                                value={formData.dataRecebimento}
                                onValueChange={(d) => handleInputChange('dataRecebimento', d)}
                                min={new Date(2020, 0, 1)}
                                max={new Date(2030, 11, 31)}
                                required
                                error={errors?.dataRecebimento}
                            />
                        </Field>
                    </FormRow>
                </FormSection>

                <SectionTitle>Informações Adicionais</SectionTitle>
                <FormSection>
                    
                    <FormRow>
                        <Field>
                            <InputSelector 
                                label="Recorrencia"
                                initialValue={formData.recorrencia}
                                options={recurrenceOptions}
                                cb={(newOption) => handleInputChange('recorrencia', Number(newOption) as EnumRecorrencia)}
                                required
                                error={errors?.recorrencia}
                            />
                        </Field>

                        <Field>
                            <InputText 
                                label="Numero do Documento"
                                name="numeroDocumento"
                                id="NumeroDocumento"
                                placeholder="Número do documento (opcional)"
                                value={formData.numeroDocumento}
                                onValueChange={(v) => handleInputChange('numeroDocumento', v)}
                            />
                        </Field>

                        <Field>
                            <InputSelector
                                label="Status"
                                initialValue={formData.status}
                                options={statusOptions}
                                cb={(newOption) => handleInputChange('status', Number(newOption) as EnumStatusReceita)}
                                required
                                error={errors?.status}
                            />
                        </Field>
                    </FormRow>
                </FormSection>

               

                <Actions>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar"}
                    </SubmitButton>
                </Actions>
            </Form>
        </Modal>
    )
}