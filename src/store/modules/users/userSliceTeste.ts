import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUserI } from '../../../types/UserType';
import { apiPost } from '../../../services/api.service';



export const criarUser = createAsyncThunk('user/criaruser', async (props: CreateUserI) => {
  const result = await apiPost('/user', props);
  return result;
});



export const userSliceTeste = createSlice({
  name: 'user',
  initialState: [] as CreateUserI[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(criarUser.fulfilled, (_, action) => {
      return action.payload.data ?? {};
    });
  }
});

export default userSliceTeste.reducer;
