import styled from 'styled-components';

export const NotificationActions = styled.div`
  display: flex;
  gap: 18px;
  button {
    background: none;
    border: none;
    color: #C0BCBC;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #44AA00;
    }
  }
`;