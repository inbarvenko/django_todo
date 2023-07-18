import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './toDoList'
import userReducer from './userData'
const store = configureStore({
  devTools: true,
  reducer: {
    todoData: todoReducer,
    userData: userReducer,
  },
});

export default store;