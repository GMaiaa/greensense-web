import { useEffect, useState } from 'react';
import { notificationsService, type Notificacao } from '../../services/notificationsService';
import {
  PageContainer,
  Header,
  NotificationList,
  NotificationItem,
  StatusTag,
  NotificationActions,
  Input,
} from './styles';

import GreenButton from '../../components/GreenButton';
import Swal from 'sweetalert2';
import { Modal } from '../../components/Modal';

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notificacao[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipo, setTipo] = useState('');
  const [destinatario, setDestinatario] = useState('');

  const carregarNotificacoes = async () => {
    const data = await notificationsService.listar();
    setNotifications(data);
  };

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await notificationsService.criar({
        titulo,
        mensagem,
        tipo,
        destinatario,
      });
      Swal.fire('Sucesso', 'Notificação criada com sucesso', 'success');
      setOpenModal(false);
      setTitulo('');
      setMensagem('');
      setTipo('');
      setDestinatario('');
      await carregarNotificacoes();
    } catch (err) {
      Swal.fire('Erro', 'Falha ao criar notificação', 'error');
    }
  };

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  return (
    <PageContainer>
      <Header>
        <h2>Notificações</h2>
        <GreenButton onClick={() => setOpenModal(true)}>Nova Notificação</GreenButton>
      </Header>

      <NotificationList>
        {notifications.map((n) => (
          <NotificationItem key={n.id}>
            <div>
              <strong>{n.titulo}</strong> - <span>{n.mensagem}</span>
              <StatusTag lida={n.lida}>
                {n.lida ? 'Lida' : 'Não Lida'}
              </StatusTag>
            </div>
            <div style={{ fontSize: 12 }}>
              Tipo: {n.tipo} • Destinatário:{' '}
              {typeof n.destinatario === 'object'
                ? n.destinatario.username
                : n.destinatario}
            </div>
            <NotificationActions>
              <button onClick={() => notificationsService.marcarComoLida(n.id)}>
                Marcar como Lida
              </button>
              <button onClick={async () => {
                const result = await Swal.fire({
                  title: 'Tem certeza?',
                  text: 'Deseja deletar essa notificação?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Sim, deletar',
                  cancelButtonText: 'Cancelar',
                });
                if (result.isConfirmed) {
                  await notificationsService.deletar(n.id);
                  await carregarNotificacoes();
                  Swal.fire('Deletado!', 'Notificação removida.', 'success');
                }
              }}>
                Deletar
              </button>
            </NotificationActions>
          </NotificationItem>
        ))}
      </NotificationList>

      <Modal
        title="Nova Notificação"
        triggerLabel=""
        open={openModal}
        onOpenChange={setOpenModal}
      >
        <form onSubmit={handleCriar}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <Input
              placeholder="Mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            />
            <Input
              placeholder="Tipo (ex.: ALERTA)"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
            <Input
              placeholder="Destinatário (username ou ID)"
              value={destinatario}
              onChange={(e) => setDestinatario(e.target.value)}
              required
            />
            <GreenButton type="submit">Criar</GreenButton>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}
