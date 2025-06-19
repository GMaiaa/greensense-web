import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaMap, FaTrash, FaBars } from 'react-icons/fa';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import {
  Container,
  Sidebar,
  NavItem,
  Main,
  Header,
  TopBarIcons,
  ContentWrapper,
  NotificationsModal
} from './styles';

import { useEffect, useState } from 'react';
import { notificationsService, type Notificacao } from '../services/notificationsService';
import { MdOutlineAssignment } from 'react-icons/md';


export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notificacao[]>([]);
  const [loadingNotificacoes, setLoadingNotificacoes] = useState(true);

  const currentPath = location.pathname;

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('token');
  };

  const carregarNotificacoes = async () => {
    try {
      const data = await notificationsService.listar();
      setNotifications(data);
    } catch (error) {
      console.error('Erro ao buscar notificações', error);
    } finally {
      setLoadingNotificacoes(false);
    }
  };

  const handleMarcarComoLida = async (id: string) => {
    try {
      await notificationsService.marcarComoLida(id);
      await carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao marcar como lida', error);
    }
  };

  const notificacoesNaoLidas = notifications.filter(n => !n.lida).length;

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  return (
    <Container>
      <Sidebar>
        <div className="logo">
          <img src="src/assets/brand.svg" alt="Logo" />
        </div>
        <nav>
          <NavItem active={currentPath === '/dashboard'} onClick={() => navigate('/dashboard')}>
            <FaHome />
          </NavItem>
          <NavItem active={currentPath === '/map'} onClick={() => navigate('/map')}>
            <FaMap />
          </NavItem>
          <NavItem active={currentPath === '/trashes'} onClick={() => navigate('/trashes')}>
            <FaTrash />
          </NavItem>
          <NavItem active={currentPath === '/users'} onClick={() => navigate('/users')}>
            <FaBars />
          </NavItem>
        </nav>
      </Sidebar>

      <Main>
        <Header>
          <TopBarIcons>
            <div style={{ position: 'relative' }}>
              <FiBell
                onClick={() => setShowNotifications((v) => !v)}
                style={{ cursor: 'pointer' }}
              />
              {notificacoesNaoLidas > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: '#44AA00',
                    borderRadius: '50%',
                    width: 10,
                    height: 10,
                  }}
                />
              )}
              {showNotifications && (
                <NotificationsModal>
                  <div className="arrow" />
                  <div className="title">Notificações</div>
                  {loadingNotificacoes ? (
                    <div className="notification">Carregando...</div>
                  ) : notifications.length === 0 ? (
                    <div className="notification">Nenhuma notificação encontrada.</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="notification"
                        style={{
                          marginBottom: 8,
                          opacity: n.lida ? 0.6 : 1,
                          cursor: 'pointer',
                        }}
                        onClick={() => handleMarcarComoLida(n.id)}
                      >
                        <strong>{n.titulo}</strong>
                        <div>{n.mensagem}</div>
                        <small>
                          Destinatário:{' '}
                          {typeof n.destinatario === 'object'
                            ? n.destinatario.username
                            : n.destinatario}
                        </small>
                      </div>
                    ))
                  )}
                  <div className="divider" />
                  <button className="see-all" onClick={() => navigate('/notifications')}>
                    Ver Todas
                  </button>
                </NotificationsModal>
              )}
            </div>

            <MdOutlineAssignment
              onClick={() => navigate('/revisoes')}
              style={{ cursor: 'pointer' }}
              size={20}
              title="Revisões"
            />
            <FiUser onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} />
            <FiLogOut onClick={handleLogout} style={{ cursor: 'pointer' }} />
          </TopBarIcons>
        </Header>

        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </Main>
    </Container>
  );
}
