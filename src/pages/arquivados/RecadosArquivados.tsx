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
  TextField,
  Typography
} from '@mui/material';
import { Botao } from '../../components/botao/Botao';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizarRecadosUser, buscarTodosRecados, criarRecadosUser, deletarRecado, deletarRecadosUser, desarquivarRecadosUser, listarRecadosUser } from '../../store/modules/recados/recadosSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Recados, { AtualizarRecadoType } from '../../types/RecadosType';
import Modal from '../../components/modal/modal';
import RecadosType from '../../types/RecadosType';


const RecadosArquivados: React.FC = () => {
 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLogged = useAppSelector(state => state.loginSlice);
 
  const recadosRedux = useAppSelector(buscarTodosRecados);


  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, [userLogged]);


  useEffect(() => {
    if (userLogged.id) {
      dispatch(listarRecadosUser(userLogged.id));
    }
  }, []);

  // useEffect(() => {
  //   dispatch(desarquivarRecadosUser({ id: userLogged, changes: { recados: recadosRedux } }));
  // }, [recadosRedux]);

  // const handleDesarquivar = (itemArquivado: RecadosType ) => {
  //   console.log('Clicou em arquivar');

  //   dispatch(desarquivarRecadosUser({
  //     idRecado: itemArquivado.id, idUser: userLogged.id,
  //     arquivado: true
  //   }));
  // };

  const handleDesarquivar = (itemArquivado: RecadosType) => {
    console.log('Clicou em arquivar');

    if(itemArquivado) {
      // dispatch(atualizarRecadosUser({ id, changes: { title: detailEdit, description: descriptionEdit } }));
      dispatch(atualizarRecadosUser({
        idRecado: itemArquivado.id , idUser: userLogged.id,
        description: itemArquivado.description,
        title: itemArquivado.title,
        arquivado: false
      }));
    }

    console.log(itemArquivado);
    
  };

  return (
    <>
      <Grid container>
        <Typography sx={{ color: 'white', fontSize: '2em', fontWeight: 900, marginLeft: '35%'}}>RECADOS ARQUIVADOS </Typography>
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
                    <IconButton sx={{ marginLeft: '20px' }} edge="end" aria-label="delete" onClick={() => handleDesarquivar(recado)}>
                      <UnarchiveIcon sx={{ color: '#ffffff' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default RecadosArquivados;
