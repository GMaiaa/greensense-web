import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProfileContainer,
  Content,
  TopBar,
  Title,
  Card,
  CardHeader,
  Form,
  Label,
  InputWrapper,
  Input,
  CardFooter,
  SaveButton,
  BackButton,
  RevisionList,
  RevisionItem,
  StatusTag,
  Actions
} from './styles.ts';

import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { revisionService, type Revisao } from '../../services/revisaoService.ts';

const Revisions: React.FC = () => {
  const navigate = useNavigate();

  const [motivo, setMotivo] = useState('');
  const [revisions, setRevisions] = useState<Revisao[]>([]);

  const carregarRevisoes = async () => {
    const data = await revisionService.listar();
    setRevisions(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!motivo) return;

    try {
      await revisionService.criar(motivo);
      await carregarRevisoes();
      setMotivo('');
      Swal.fire({
        icon: 'success',
        title: 'Revisão solicitada!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire('Erro', 'Não foi possível solicitar a revisão.', 'error');
    }
  };

  const handleCancelar = async (id: number) => {
    try {
      await revisionService.cancelar(id);
      await carregarRevisoes();
      Swal.fire('Cancelado!', 'Solicitação cancelada com sucesso.', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Erro', 'Não foi possível cancelar a solicitação.', 'error');
    }
  };

  useEffect(() => {
    carregarRevisoes();
  }, []);

  return (
    <ProfileContainer>
      <Content>
        <Title>Solicitações de Revisão</Title>
        <TopBar>
          <BackButton onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} style={{ marginRight: 10 }} />
            Voltar
          </BackButton>
        </TopBar>

        <Card>
          <CardHeader>Nova Solicitação</CardHeader>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label>Motivo</Label>
              <InputWrapper>
                <Input
                  placeholder="Descreva o motivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                />
              </InputWrapper>
            </div>
            <CardFooter>
              <SaveButton type="submit">Solicitar Revisão</SaveButton>
            </CardFooter>
          </Form>
        </Card>

        <Card>
          <CardHeader>Revisões Solicitadas</CardHeader>
          {revisions.length === 0 ? (
            <p style={{ padding: '16px', color: '#aaa' }}>
              Nenhuma solicitação realizada.
            </p>
          ) : (
            <RevisionList>
              {revisions.map((rev) => (
                <RevisionItem key={rev.id}>
                  <div>
                    <strong>{rev.motivo}</strong>
                    <StatusTag status={rev.status}>{rev.status}</StatusTag>
                  </div>
                  <Actions>
                    {rev.status === 'Pendente' && (
                      <button onClick={() => handleCancelar(rev.id)}>Cancelar</button>
                    )}
                  </Actions>
                </RevisionItem>
              ))}
            </RevisionList>
          )}
        </Card>
      </Content>
    </ProfileContainer>
  );
};

export default Revisions;
