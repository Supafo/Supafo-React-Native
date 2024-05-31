import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type DetailType = {
  detailOfOrder: string;
};

const initialState: DetailType = {
  detailOfOrder: 'PreparingOrder',
};

export const orderDetail = createSlice({
  name: 'detailOfOrder',
  initialState,
  reducers: {
    setOrderDetail: (state, action: PayloadAction<string>) => {
      state.detailOfOrder = action.payload;
    },
  },
});

export const {setOrderDetail} = orderDetail.actions;

export default orderDetail.reducer;
