import type { Notification } from '../../services/notificationsService';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { notificationsService } from '../../services/notificationsService';
import { NotificationActions } from './styles';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
`;

const Card = styled.div`
  background: #23232a;
  border-radius: 12px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function AllNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        notificationsService.listar()
            .then(data => {
                setNotifications(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <Container>
            <strong>Notificações</strong>
            {loading ? (
                <div>Carregando...</div>
            ) : notifications.length === 0 ? (
                <div>Nenhuma notificação encontrada.</div>
            ) : (
                notifications.map(n => (
                    <Card key={n.id}>
                        <strong>{n.titulo}</strong>
                        <div>{n.mensagem}</div>
                        <small>Destinatário: {n.destinatario}</small>
                        <NotificationActions>
                            <button title="Visualizar" 
                            // onClick={() => navigate(``)}
                            >
                                <FiEye />
                            </button>
                            <button title="Editar" 
                            // onClick={() => handleEditar(item)}
                            >
                                <FiEdit2 />
                            </button>
                            <button title="Excluir" 
                            // onClick={() => handleExcluir(item.id)}
                            >
                                <FiTrash2 />
                            </button>
                        </NotificationActions>
                    </Card>
                ))

            )}

        </Container>
    );
} 