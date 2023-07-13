import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ToDoType, FilterEnum } from '../types';
import { getTodos } from '../api/todoApi'

type InitialState = {
  toDoList: ToDoType[];
  filter: FilterEnum;
  pages: number[];
  currentPage: number;
  activeTasks: number;
}

const initialState: InitialState = {
  toDoList: [],
  filter: FilterEnum.all,
  pages: [1],
  currentPage: 1,
  activeTasks: 0,
}

const toDoList = createSlice({
  name: 'ToDoList',
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<FilterEnum>) => {
      state.filter = action.payload;
    },
    setList: (
      state, 
      action: PayloadAction<{ 
        todos: ToDoType[],
         numberOfPages: number[],
         activeTasks: number,
         }>
      ) => {
        state.toDoList = action.payload.todos;
        state.pages = action.payload.numberOfPages;
        state.activeTasks = action.payload.activeTasks;
      },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    changeStatusTask: (state, action: PayloadAction<number>) => {
      state.toDoList.forEach((item) => {
        if (item._id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
    changeTitleTask: (
      state,
      action: PayloadAction<{ _id: number; title: string }>
    ) => {
      state.toDoList.forEach((item) => {
        if (item._id === action.payload._id) {
          item.title = action.payload.title.trim();
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => { 
    builder.addCase(getTodos.fulfilled, (state, action) => {
      try{
        state.pages = action.payload.pages;
        state.toDoList = action.payload.todos;
        state.activeTasks = action.payload.activeTasks;
      }
      catch(err){
        console.log(`Error! Unable to get todos! ${err}`);
      }
    });

    builder.addCase(getTodos.rejected, (state, action) => {
      console.log(`Error! Unable to get todos!`);
    });
  }
});

export default toDoList.reducer;
export const {
  changeFilter,
  setCurrentPage,
  setList,
  changeStatusTask,
  changeTitleTask,
} = toDoList.actions;
