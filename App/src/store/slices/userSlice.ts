import {createSlice} from '@reduxjs/toolkit';
import {UserState} from '../store.type';
import {RootState} from '../store';

const initialState: UserState = {
  name: '',
  token: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {setUserName, updateToken} = UserSlice.actions;

export const getUserLoggedIn = (state: RootState) => !!state.user.token;

export default UserSlice.reducer;
