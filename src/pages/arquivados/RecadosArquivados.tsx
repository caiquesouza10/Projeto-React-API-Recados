/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
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
  Typography
} from '@mui/material';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizarRecadosUser, recadosUserArquivados } from '../../store/modules/recados/recadosSlice';
// import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ArquivarRecadoUser } from '../../types/RecadosType';
import RecadosType from '../../types/RecadosType';


const RecadosArquivados: React.FC = () => {
 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLogged = useAppSelector(state => state.loginSlice);
  const recadosArquivados: any = useAppSelector((state) => state.recados.arquivados);


  useEffect(() => {
    if (!userLogged.id) {
      navigate('/');
    }
  }, [userLogged]);


  useEffect(() => {
    if (userLogged.id) {
      dispatch(recadosUserArquivados({ idUser: userLogged.id } as ArquivarRecadoUser));
    }
  }, [dispatch, userLogged.id]);

 
  const handleDesarquivar = (itemArquivado: RecadosType) => {
    console.log('Clicou em arquivar');
    if(itemArquivado) {
      dispatch(atualizarRecadosUser({
        idRecado: itemArquivado.id , idUser: userLogged.id,
        description: itemArquivado.description,
        title: itemArquivado.title,
        arquivado: false
      }));
    }
    window.location.reload();
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
              {recadosArquivados.map((recado:any, index: any) => (
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
