import styled from 'styled-components';

export const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #121214;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: #e0e0e0;
  margin-bottom: 20px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #c0bcbb;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #44aa00;
  }
`;

export const Card = styled.div`
  background: #23232a;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const CardHeader = styled.h3`
  color: #e0e0e0;
  margin: 0;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  color: #c0bcbb;
  font-size: 14px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #121214;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0 12px;

  &:focus-within {
    border-color: #44aa00;
  }
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  padding: 10px 0;
  flex: 1;
  font-size: 14px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
  }
`;

export const SaveButton = styled.button`
  background: #44aa00;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #368800;
  }
`;

// 🔥 Lista de Revisões
export const RevisionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
`;

export const RevisionItem = styled.div`
  background: #23232a;
  border-radius: 12px;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatusTag = styled.span<{ status: string }>`
  background: ${({ status }) =>
    status === 'Aprovado'
      ? '#44AA00'
      : status === 'Recusado'
      ? '#aa0000'
      : '#f0ad4e'};
  color: #fff;
  padding: 4px 10px;
  border-radius: 10px;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 500;
`;

export const Actions = styled.div`
  button {
    background: none;
    border: none;
    color: #c0bcbc;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: #44aa00;
    }
  }
`;
