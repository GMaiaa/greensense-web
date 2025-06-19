import api from './api';

export interface Revisao {
  id: number;
  motivo: string;
  status: 'Pendente' | 'Aprovado' | 'Recusado';
  dataCriacao: string;
}

export const revisionService = {
  listar: async (): Promise<Revisao[]> => {
    const response = await api.get('/revisao');
    return response.data;
  },

  criar: async (motivo: string): Promise<Revisao> => {
    const response = await api.post('/revisao', { motivo });
    return response.data;
  },

  cancelar: async (id: number) => {
    await api.delete(`/revisao/${id}`);
  },
};
