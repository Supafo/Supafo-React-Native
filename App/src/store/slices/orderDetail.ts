import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type DetailType = {
  detailOfOrder: string;
  isOrdered: boolean;
};

const initialState: DetailType = {
  detailOfOrder: 'null',
  isOrdered: false,
};

export const orderDetail = createSlice({
  name: 'detailOfOrder',
  initialState,
  reducers: {
    setOrderDetail: (state, action: PayloadAction<string>) => {
      state.detailOfOrder = action.payload;
    },
    setIsOrdered: (state, action: PayloadAction<boolean>) => {
      state.isOrdered = action.payload;
    },
  },
});

export const {setOrderDetail, setIsOrdered} = orderDetail.actions;

export default orderDetail.reducer;
