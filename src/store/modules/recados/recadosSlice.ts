import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import Recados, { ArquivarRecadoUser, AtualizarRecadoType, CriarRecadosUserType, DeletRecadoType } from '../../../types/RecadosType';
import { apiDelete, apiGet, apiPost, apiUpdate } from '../../../services/api.service';
import { InitialStateUser } from '../users/loginSlice';

export const listarRecadosUser = createAsyncThunk('recado/listarRecadosUser', async (props: string) => {
  const result = await apiGet(`/user/${props}/recados`);
  return result;
});

export const criarRecadosUser = createAsyncThunk('recado/criarRecadosUser', async (props: CriarRecadosUserType) => {
  const result = await apiPost(`/user/${props.idUser}/recados`, props );
  return result;
});

export const deletarRecadosUser = createAsyncThunk('recado/deletarRecadosUser', async (props: DeletRecadoType) => {
  const result = await apiDelete(`/user/${props.idUser}/recados/${props.idRecado}`);
  return result;
});

export const atualizarRecadosUser = createAsyncThunk('recado/atualizarRecadosUser', async (props: AtualizarRecadoType) => {
  const result = await apiUpdate(`/user/${props.idUser}/recados/${props.idRecado}`, props);
  return result;
});

export const recadosUserArquivados = createAsyncThunk('recado/recadosUserArquivados', async (props: ArquivarRecadoUser) => {
  const result = await apiGet(`/user/${props.idUser}/recados/arquivados`);

  console.log(result);
  
  return result;
});




const adapter = createEntityAdapter<Recados>({
  selectId: item => item.id
});

export const { selectAll: buscarTodosRecados, selectById: buscarRecadoPorId } = adapter.getSelectors(
  (state: RootState) => state.recados
);

const recadosSlice = createSlice({
  name: 'recados',
  initialState: adapter.getInitialState({ ok: false, message: '',  arquivados: [] }),
  reducers: {
    adicionarRecado: adapter.addOne,
    atualizarRecado: adapter.updateOne,
    deletarRecado: adapter.removeOne,
    adicionarTodosRecados: adapter.setAll
  },
  extraReducers(builder) {
    builder.addCase(listarRecadosUser.fulfilled, (state, action: PayloadAction<InitialStateUser>) => {
      if (action.payload.ok) {
        adapter.setAll(state, action.payload.data);
      }
      state.ok = action.payload.ok;
      state.message = action.payload.message;
    });

    builder.addCase(criarRecadosUser.fulfilled, (state, action: PayloadAction<InitialStateUser>) => {
      if (action.payload.ok) {
        adapter.addOne(state, action.payload.data);
      }
      state.ok = action.payload.ok;
      state.message = action.payload.message;
    });

    builder.addCase(deletarRecadosUser.fulfilled, (state, action: PayloadAction<InitialStateUser>) => {
      if (action.payload.ok) {
        adapter.removeOne(state, action.payload.data);
      }
      state.ok = action.payload.ok;
      state.message = action.payload.message;
    });

    builder.addCase(atualizarRecadosUser.fulfilled, (state, action: PayloadAction<InitialStateUser>) => {
      if (action.payload.ok) {
        // adapter.updateOne(state, action.payload.data);
        adapter.updateOne(state, {
          id: action.payload.data.id,
          changes: action.payload.data
        });
      }
      state.ok = action.payload.ok;
      state.message = action.payload.message;
    });

    builder.addCase(recadosUserArquivados.fulfilled, (state, action: PayloadAction<InitialStateUser>) => {
      if(action.payload.ok){
        state.arquivados = action.payload.data;
      }
      state.ok = action.payload.ok;
      state.message = action.payload.message;
    });
  }
});

export const { adicionarRecado, atualizarRecado, deletarRecado, adicionarTodosRecados } = recadosSlice.actions;
export default recadosSlice.reducer;
