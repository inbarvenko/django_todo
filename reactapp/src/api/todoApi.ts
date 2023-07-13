import { ToDoType } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authHeader from "./headers";
import { axiosInstance } from "./request";

type ResponseTodo = {
  todos: ToDoType[],
  pages: number[],
  activeTasks: number,
}

type Params = {
  filter: string,
  currentPage: number,
}

export const getTodos = createAsyncThunk('todos/getTodos',
  async (arg: Params, thunkAPI) => {
    const auth = authHeader();
    const res = await axiosInstance.get<ResponseTodo>('/todos',
      {
        headers: auth,
        params: {
          filter: arg.filter,
          page: arg.currentPage,
        },
      });
    return res?.data;
  }
)

export const addTodo = (title: string) => {
  console.log(title)
  return axiosInstance.post<ToDoType>('/', { title });
}

export const updateTodo = (item: ToDoType) => {
  return axiosInstance.patch<ToDoType>('/', item);
}

export const deleteTodo = (itemID: number) => {
  console.log(itemID)
  return axiosInstance.delete<ToDoType>('/', {
    data: { _id: itemID },
  });
}