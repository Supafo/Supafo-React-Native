import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type IdType = {
  id: string;
};

const initialState: IdType = {
  id: 'eka',
};

export const setUserId = createSlice({
  name: 'setUserId',
  initialState: initialState,
  reducers: {
    userId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const {userId} = setUserId.actions;

export default setUserId.reducer;
