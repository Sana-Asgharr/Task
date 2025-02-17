import { combineReducers } from '@reduxjs/toolkit'
import userSlice from './user/userSlice';
import loginSlice from './user/loginSlice';

export const rootReducer = combineReducers({
   user: userSlice,
   loginUser: loginSlice
})

export default rootReducer;
