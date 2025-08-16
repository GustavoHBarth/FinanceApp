import { Conta, ContasResponse, CreateContaRequest, ContaResponse, UpdateContaRequest } from "@/backend/dto";
import api from '@/backend/api'
import { useEffect, useState } from "react";

export function useContas() {
    const [contas, setContas] = useState<Conta[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [creating, setCreating] = useState(false)

    const fetchContas = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.get<ContasResponse>('/contas/all')
            
            if (response.data.success) {
                setContas(response.data.data)
            } else {
                setError(response.data.message || 'Erro ao buscar contas')
            }
        } catch (err: any) {
            setError(err.message || 'Erro ao conectar com o servidor')
            console.error('Erro ao buscar contas:', err)
        } finally {
            setLoading(false)
        }
    }

    const createConta = async (contaData: CreateContaRequest): Promise<boolean> => {
        console.log('Hook: Iniciando criação de conta:', JSON.stringify(contaData, null, 2));
        setCreating(true)
        setError(null)

        try {
            // Tentar primeiro com /contas (POST padrão)
            let response;
            try {
                response = await api.post<ContaResponse>('/contas', contaData)
            } catch (postError: any) {
                // Se falhar, tentar com /contas/create
                if (postError.status === 404) {
                    response = await api.post<ContaResponse>('/contas/create', contaData)
                } else {
                    throw postError;
                }
            }
            
            console.log('Hook: Resposta da API:', response.data);
            
            if (response.data.success) {
                console.log('Hook: Conta criada com sucesso, recarregando lista...');
                // Recarregar a lista de contas
                await fetchContas()
                return true
            } else {
                console.log('Hook: Erro na resposta da API:', response.data.message);
                setError(response.data.message || 'Erro ao criar conta')
                return false
            }
        } catch (err: any) {
            console.error('Erro completo ao criar conta:', err);
            console.error('Status:', err.status);
            console.error('Response data:', err.data);
            console.error('Message:', err.message);
            
            setError(err.message || 'Erro ao conectar com o servidor')
            return false
        } finally {
            setCreating(false)
        }
    }

    useEffect(() => {
        fetchContas()
    }, [])

    const deleteConta = async (contaId: string, deleteParcelas: boolean = false): Promise<boolean> => {
        console.log('Hook: Iniciando exclusão de conta:', contaId, 'deleteParcelas:', deleteParcelas);
        setError(null)

        try {
            const response = await api.delete(`/contas/${contaId}?deleteParcelas=${deleteParcelas}`)
            console.log('Hook: Resposta da exclusão:', response.data);

            if (response.data.success) {
                console.log('Hook: Conta excluída com sucesso, recarregando lista...');
                await fetchContas()
                return true
            } else {
                console.log('Hook: Erro na resposta da API:', response.data.message);
                setError(response.data.message || 'Erro ao excluir conta')
                return false
            }
        } catch (err: any) {
            console.error('Erro completo ao excluir conta:', err);
            console.error('Status:', err.response?.status);
            console.error('Response data:', err.response?.data);
            console.error('Message:', err.message);

            setError(err.message || 'Erro ao conectar com o servidor')
            return false
        }
    }

    const updateConta = async (contaId: string, data: UpdateContaRequest ) => {
        setError(null)

        try {
            const response = await api.put(`/contas/${contaId}`, data)
            console.log('Hook: Resposta da edição:', response.data);

            if (response.data.success) {
                console.log('Hook: Conta editada com sucesso, recarregando lista...');
                await fetchContas()
                return true
            } 
            else {
                console.log('Hook: erro na resposta da API', response.data.message);
                setError(response.data.message || 'Erro ao editar conta')
                return false
            }
        }
        catch (err: any) {
            console.error('Erro completo ao editar conta:', err);
            setError(err.message || 'Erro ao conectar com o servidor')
            return false
        }   
    }   

    return { 
        contas, 
        loading, 
        error, 
        creating,
        refetch: fetchContas,
        createConta,
        deleteConta,
        updateConta
    }
}