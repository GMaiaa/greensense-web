import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 40px auto 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #E0E0E0;
  margin-bottom: 24px;
  font-size: 17px;
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const NotificationItem = styled.div`
  background: #23232a;
  border-radius: 12px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatusTag = styled.span<{ lida: boolean }>`
  display: inline-block;
  margin-left: 18px;
  padding: 3px 16px;
  border-radius: 8px;
  background-color: ${({ lida }) => (lida ? '#555' : '#44AA00')};
  color: #fff;
  font-size: 13px;
  font-weight: 500;
`;

export const NotificationActions = styled.div`
  display: flex;
  gap: 14px;

  button {
    background: none;
    border: none;
    color: #C0BCBC;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #44AA00;
    }
  }
`;

export const Input = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #121214;
  color: #fff;
  font-size: 14px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #44AA00;
  }
`;
