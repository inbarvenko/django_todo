import { ToDoType } from "../types";
import IUser from '../types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import authHeader from "./headers";
import { axiosInstance } from "./request";
import { LocalStorageTools } from "../localStorage";
import { useAppSelector } from "../redux/hooks";

type Results = {
  todos: ToDoType[],
  pages: number[],
  activeTasks: number,
}

type ResponseTodo = {
  results: ToDoType[],
}

type Params = {
  filter: string,
  currentPage: number,
  userID: number | null | undefined
}

export const getTodos = createAsyncThunk('todos/getTodos',
  async (arg: Params, thunkAPI) => {
    console.log('get todos')
    const auth = authHeader();
    const res = await axiosInstance.get<ResponseTodo>('/todos',
      {
        headers: auth,
        params: {
          filter: arg.filter,
          page: arg.currentPage,
          userId: arg.userID
        },
      });
      console.log(res)
      const dsa: Results = {
        pages: [1],
        todos: res?.data.results,
        activeTasks: 5
      }
    return dsa;
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