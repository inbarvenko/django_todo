import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './toDoList'

const store = configureStore({
  devTools: true,
  reducer: {
    todoData: todoReducer,
  },
});

export default store;