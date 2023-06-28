/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { Botao } from '../../components/botao/Botao';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizarRecadosUser, buscarTodosRecados, criarRecadosUser, deletarRecadosUser, listarRecadosUser } from '../../store/modules/recados/recadosSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import RecadosType from '../../types/RecadosType';


const HomeRecado: React.FC = () => {
 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');

  const [openModal, setOpenModal] = React.useState(false);

  const [recadoEdit, setRecadoEdit] = useState<RecadosType | undefined>();

  const [valid, setValid] = useState<boolean>(false);

  const userLogged = useAppSelector(state => state.loginSlice);

  const recadosRedux = useAppSelector(buscarTodosRecados);


  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, [userLogged]);

  useEffect(() => {
    if (detail.length >= 5 && description.length >= 5) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [detail, description]);

  useEffect(() => {
    if (userLogged.id) {
      dispatch(listarRecadosUser(userLogged.id));
    }
  }, []);

  const handleSave = () => {
    Swal.fire({
      title: 'Sucesso!',
      text: 'Recado cadastrado com sucesso.',
      icon: 'success',
      confirmButtonText: 'Confirmar',
      timer: 2000
    });

    dispatch(
      criarRecadosUser({
        // id: uuidv4(),
        idUser: userLogged.id,
        description,
        title: detail,
        arquivado: false,
      })
    );

    clearInput();
  };

  const handleDelete = (itemDelete: RecadosType) => {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: 'Você não poderá reverter isso!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0dab61',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, quero deletar!'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deletarRecadosUser({idRecado: itemDelete.id, idUser: userLogged.id}));
        // chamar outro dispatch para remover o intem e salvar
        window.location.reload();
        Swal.fire('Deletado!', 'Sua transação foi excluida.', 'success');
      }
    });
  };

  const handleArquivar = (itemArquivado: RecadosType) => {
    if(itemArquivado) {
      // dispatch(atualizarRecadosUser({ id, changes: { title: detailEdit, description: descriptionEdit } }));
      dispatch(atualizarRecadosUser({
        idRecado: itemArquivado.id , idUser: userLogged.id,
        description: itemArquivado.description,
        title: itemArquivado.title,
        arquivado: true
      }));
    }
    window.location.reload();
  };

  const handleClickOpen = (itemEdit: RecadosType) => {
    setRecadoEdit(itemEdit);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const clearInput = () => {
    setDetail('');
    setDescription('');
  };
  return (
    <>
      <Grid container spacing={7}>
        
        <Grid item xs={12} sm={5} width="30vw">
          <TextField
            label="Tiutlo"
            name="Titulo"
            type="text"
            value={detail}
            onChange={e => setDetail(e.target.value)}
            fullWidth
            variant="filled"
            color="success"
            required
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
          />
        </Grid>

        <Grid item xs={12} sm={5} width="30vw">
          <TextField
            label="Detalhamento"
            name="Detalhamento"
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            required
            variant="filled"
            color="success"
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Botao tipoBotao="button" onClick={handleSave} disable={!valid}>
            Cadastrar
          </Botao>
        </Grid>
      </Grid>

      <Grid container>
        <TableContainer sx={{ marginTop: '1%', width: '90vw' }} component={Paper} elevation={5}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#032a186b' }}>
                <TableCell sx={{ color: 'white', fontSize: 15, fontWeight: 900, border: '1px solid #fff' }}>
                  {' '}
                  # ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: 'white', fontSize: 15, fontWeight: 900, border: '1px solid #fff' }}
                >
                  TITULO
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: 'white', fontSize: 15, fontWeight: 900, border: '1px solid #fff' }}
                >
                  DETALHAMENTO
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: 'white', fontSize: 15, fontWeight: 900, border: '1px solid #fff' }}
                >
                  AÇÕES
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={{ backgroundColor: '#43385e' }}>
              {recadosRedux.map((recado, index) => (
                <TableRow sx={{ border: '1px solid #fff' }} key={recado.id}>
                  <TableCell align="center" sx={{ color: 'white', border: '1px solid #fff' }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', border: '1px solid #fff' }}>
                    {recado.title}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', border: '1px solid #fff' }}>
                    {recado.description}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', border: '1px solid #fff' }}>
                    <IconButton sx={{ marginLeft: '20px' }} edge="end" aria-label="edit" onClick={() => handleClickOpen(recado)}>
                      <EditIcon sx={{ color: '#ffffff' }} />
                    </IconButton>
                    <IconButton sx={{ marginLeft: '20px' }} edge="end" aria-label="delete" onClick={() => handleDelete(recado)}>
                      <DeleteIcon sx={{ color: '#ffffff' }} />
                    </IconButton>
                    <IconButton sx={{ marginLeft: '20px' }} edge="end" aria-label="delete" onClick={() => handleArquivar(recado)}>
                      <ArchiveIcon sx={{ color: '#ffffff' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Modal
        openDialog={openModal}
        detail={recadoEdit?.title ?? ''}
        description={recadoEdit?.description ?? ''}
        id={recadoEdit?.id}
        actionCancel={handleClose}
      />
    </>
  );
};

export default HomeRecado;
