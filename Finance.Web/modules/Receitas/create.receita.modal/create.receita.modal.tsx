import Modal  from "@/resources/components/Modal"
import React, { useState } from "react";
import { CreateReceitaRequestDTO, } from "@/backend/dto.typegen/create-receita-request-dto"; 
import { EnumCategoriaReceita } from "@/backend/dto.typegen/enum-categoria-receita";
import { EnumStatusReceita } from "@/backend/dto.typegen/enum-status-receita";
import { EnumRecorrencia } from "@/backend/dto.typegen/enum-recorrencia";
import { Form, FormSection, SectionTitle, FormRow, Field, Label, Input, Actions, SubmitButton } from "./create.receita.modal.style"
import InputSelector from "@/resources/components/Inputs/Selector"
import InputCurrency from "@/resources/components/Inputs/InputCurrency";
 
interface CreateReceitaModalProps{
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => Promise<boolean> | boolean;
}


export default function CreateReceitaModal({ isOpen, onClose, onSubmit}: CreateReceitaModalProps) {
    const [formData, setFormData] = useState<CreateReceitaRequestDTO>({
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
    })
    
    const [valor, setValor] = React.useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!onSubmit) {
            onClose();
            return;
        }
        const ok = await onSubmit( formData );
        if (ok) onClose();
    };

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: keyof CreateReceitaRequestDTO, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}

    };

    const categoryOptions = [
        { value: EnumCategoriaReceita.Outros, title: "Outros" },
        { value: EnumCategoriaReceita.Salario, title: "Salario" },
        { value: EnumCategoriaReceita.Bonus, title: "Bonus" },
        { value: EnumCategoriaReceita.Investimentos, title: "Investimentos" },
        { value: EnumCategoriaReceita.Freelance, title: "Freelance" }
    ]

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Nova Receita" 
            size="large">

            <Form onSubmit={handleSubmit}>
                <SectionTitle>Informações Básicas</SectionTitle>
                <FormSection>
                    <FormRow>
                        <Field>
                            <Label>Título</Label>
                            <Input 
                                type="text"
                                placeholder="Ex. Salário"
                                value={formData.titulo}
                                onChange={(e) => handleInputChange('titulo', e.target.value)}
                                required
                            />
                        </Field>
                           
                        <Field>
                            <Label>Descrição</Label>
                            <Input
                                id="descricao"
                                type="text"
                                value={formData.descricao}
                                onChange={(e) => handleInputChange('descricao', e.target.value)}
                                placeholder="Descrição adicional (opcional)"
                            />
                        </Field>

                        <Field>
                            <InputCurrency
                                label="Valor"
                                name="valor"
                                value={valor}
                                onValueChange={setValor} // recebe decimal (ex: 1234.56)
                                prefix="R$"
                                min={0}
                                required
                                error={errors?.valor}
                            />
                        </Field>

                        <Field>
                            <InputSelector
                                label="Categoria"
                                required
                                initialValue={formData.categoria}
                                options={categoryOptions}
                                cb={(newOption) => handleInputChange('categoria', Number(newOption) as EnumCategoriaReceita)}
                            />
                        </Field>
                    </FormRow>
                </FormSection>

                <SectionTitle>Informações Adicionais</SectionTitle>
                <FormSection>
                    
                    <FormRow>

                    </FormRow>
                </FormSection>

               

                <Actions>
                    <SubmitButton type="submit">Salvar</SubmitButton>
                </Actions>
            </Form>
        </Modal>
    )

}
