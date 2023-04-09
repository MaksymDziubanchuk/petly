import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  menuActive: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuActive: (state, action) => {
      state.menuActive = action.payload;
    },
  },
});



export const { setMenuActive } = menuSlice.actions;

export default menuSlice.reducer;
