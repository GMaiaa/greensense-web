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

type Notifications = {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: string;
  lida: boolean;
  dataCriacao: string;
  destinatario: string;
};

import { useEffect, useState } from 'react';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [loadingNotificacoes, setLoadingNotificacoes] = useState(true);

  const currentPath = location.pathname;

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    import('../services/notificationsService').then(({ notificationsService }) => {
      notificationsService.listar()
        .then(data => {
          setNotifications(data);
          setLoadingNotificacoes(false);
        })
        .catch(() => setLoadingNotificacoes(false));
    });
  }, []);

  return (
    <Container>
      <Sidebar>
        <div className="logo">
          <img src="src/assets/brand.svg" />
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
                      <div key={n.id} className="notification" style={{ marginBottom: 8 }}>
                        <strong>{n.titulo}</strong>
                        <div>{n.mensagem}</div>
                        <small>Destinatário: {n.destinatario}</small>
                      </div>
                    ))
                  )}
                  <div className="divider" />
                  <button className="see-all" onClick={() => navigate('/notifications')}>Ver Todas</button>
                </NotificationsModal>
              )}
            </div>
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
