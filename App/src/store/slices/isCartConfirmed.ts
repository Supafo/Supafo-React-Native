import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type ConfirmType = {
  isConfirmed: boolean;
};

const initialState: ConfirmType = {
  isConfirmed: false,
};

export const isCartConfirmed = createSlice({
  name: 'confirmedCart',
  initialState,
  reducers: {
    confirm: (state, action: PayloadAction<boolean>) => {
      state.isConfirmed = action.payload;
    },
  },
});

export const {confirm} = isCartConfirmed.actions;

export default isCartConfirmed.reducer;
