import api from './api';

export interface Usuario {
  id: string;
  username: string;
  senha?: string;
  role: string;
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: string;
  lida: boolean;
  dataCriacao: string;
  destinatario: string | Usuario; // <- O destinatário pode ser um string (ID) ou o objeto Usuario
}

export const notificationsService = {
  listar: async (): Promise<Notificacao[]> => {
    const response = await api.get('/notificacoes');
    return response.data;
  },

  buscarPorId: async (id: string): Promise<Notificacao> => {
    const response = await api.get(`/notificacoes/${id}`);
    return response.data;
  },

  criar: async (notificacao: Omit<Notificacao, 'id' | 'lida' | 'dataCriacao'>) => {
    const response = await api.post('/notificacoes', notificacao);
    return response.data;
  },

  atualizar: async (id: string, notificacao: Omit<Notificacao, 'id' | 'lida' | 'dataCriacao'>) => {
    const response = await api.put(`/notificacoes/${id}`, notificacao);
    return response.data;
  },

  marcarComoLida: async (id: string) => {
    await api.patch(`/notificacoes/${id}/ler`);
  },

  deletar: async (id: string) => {
    await api.delete(`/notificacoes/${id}`);
  },
};
