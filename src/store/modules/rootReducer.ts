import { combineReducers } from '@reduxjs/toolkit';

// import users from './users/usersSlice';
import recados from './recados/recadosSlice';
import loginSlice from './users/loginSlice';
import userSliceTeste from './users/userSliceTeste';
// import userLogged from './users/userLogged';
// import userSlice5 from './users/usersSlice5';

export default combineReducers({

  // users,
 
  recados,
  loginSlice,
  userSliceTeste

});
