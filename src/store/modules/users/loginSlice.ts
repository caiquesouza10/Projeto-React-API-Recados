import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiPost } from '../../../services/api.service';
import { LoginUserI, UserLogged } from '../../../types/UserType';



export const loginUser = createAsyncThunk('user/loginUser', async (props: LoginUserI) => {
  const result = await apiPost('/user/login', props);
  return result;
});


export interface InitialStateUser {
  ok: boolean,
  message: string,
  data: any,
}

const initialState: UserLogged = {
  id: '',
  email: '',
  name: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearUserLogged: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (_, action) => {
      return action.payload.data ?? {};
    });
  }
});
export const { clearUserLogged } = loginSlice.actions;
export default loginSlice.reducer;
