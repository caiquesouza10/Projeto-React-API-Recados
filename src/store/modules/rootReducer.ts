import { combineReducers } from '@reduxjs/toolkit';
import recados from './recados/recadosSlice';
import loginSlice from './users/loginSlice';
import userSliceTeste from './users/userSliceTeste';



export default combineReducers({
  recados,
  loginSlice,
  userSliceTeste

});
