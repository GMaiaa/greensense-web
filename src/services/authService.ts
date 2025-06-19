import api from './api';

export const authService = {
  // Cadastrar usuário
  register: async (data: { username: string; senha: string; role: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Listar usuários
  listUsers: async () => {
    const response = await api.get('/auth/usuarios');
    return response.data;
  },
};
