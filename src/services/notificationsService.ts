import api from './api';

export interface Notification {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: string;
  lida: boolean;
  dataCriacao: string;
  destinatario: string;
}

export const notificationsService = {
  listar: async (): Promise<Notification[]> => {
    const response = await api.get('/notificacoes');
    return response.data;
  },

  marcarComoLida: async (id: string): Promise<Notification> => {
    const response = await api.patch(`/notificacoes/${id}/ler`);
    return response.data;
  },

  buscarPorId: async (id: string): Promise<Notification> => {
    const response = await api.get(`/notificacoes/${id}`);
    return response.data;
  },

  excluir: async (id: string) => {
    await api.delete(`/notificacoes/${id}`);
  },

  criar: async (notification: Omit<Notification, 'id' | 'dataCriacao'>): Promise<Notification> => {
    const response = await api.post('/notificacoes', notification);
    return response.data;
  },

//   editar: async (id: string, notification: Partial<Omit<Notification, 'id' | 'dataCriacao'>>): Promise<Notification> => {
//     const response = await api.put(`/notificacoes/${id}`, notification);
//     return response.data;
//   },
}; 