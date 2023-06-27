import { configureStore } from '@reduxjs/toolkit';
import menuIconSlice from './menu-icon-slice';

const store = configureStore({
  reducer: {
    menuIcon: menuIconSlice.reducer,
  },
});

export default store;
