const { createSlice } = require('@reduxjs/toolkit');

const menuIconSlice = createSlice({
  name: 'menuIcon',
  initialState: { state: true },
  reducers: {
    toggleState: (state) => {
      state.state = !state.state;
    },
  },
});

export default menuIconSlice;
export const { toggleState } = menuIconSlice.actions;
