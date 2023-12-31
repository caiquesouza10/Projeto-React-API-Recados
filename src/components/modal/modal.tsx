import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizarRecado, atualizarRecadosUser } from '../../store/modules/recados/recadosSlice';
import { AtualizarRecadoType } from '../../types/RecadosType';

interface ModalI {
  id?: string;
  detail: string;
  description: string;
  openDialog: boolean;
  idUser?: string
  actionCancel: () => void;
}

const Modal: React.FC<ModalI> = ({ detail, description, openDialog, actionCancel, id, idUser }) => {
  const [detailEdit, setDetailEdit] = useState('');
  const [descriptionEdit, setDescriptionEdit] = useState('');

  const userLogged = useAppSelector(state => state.loginSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDetailEdit(detail);
    setDescriptionEdit(description);
  }, [detail, description]);

  
  const handleEdit = () => {
   
    if(id) {
      // dispatch(atualizarRecadosUser({ id, changes: { title: detailEdit, description: descriptionEdit } }));
      dispatch(atualizarRecadosUser({
        idRecado: id, idUser: userLogged.id,
        description: descriptionEdit,
        title: detailEdit
      }));
    }
    
    actionCancel();
  };

  return (
    <Grid container>
      <Dialog
        open={openDialog}
        onClose={actionCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography variant='h5' textAlign='center' mt='15px'>Editar Recado</Typography>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label="Titulo"
              name="Titulo"
              //value={descriptionEdit}
              value={detailEdit}
              type="text"
              variant="outlined"
              fullWidth
              required
              sx={{ mt: 2 }}
              //onChange={(ev) => setDescriptionEdit(ev.target.value)}
              onChange={(ev) => setDetailEdit(ev.target.value)}
            />

            <TextField
              label="Detalhamento"
              name="Detalhamento"
              //value={detailEdit}
              value={descriptionEdit}
              type="text"
              variant="outlined"
              fullWidth
              required
              sx={{ mt: 2 }}
              //onChange={(ev) => setDetailEdit(ev.target.value)}
              onChange={(ev) => setDescriptionEdit(ev.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={actionCancel} >Cancelar</Button>
          <Button variant='contained' onClick={handleEdit} color="success">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Modal;
