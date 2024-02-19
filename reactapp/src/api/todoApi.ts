import { FilterEnum, ToDoType } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authHeader from "./headers";
import { axiosInstance } from "./request";

type Results = {
  todos: ToDoType[];
  pages: number;
  activeTasks: number;
};

type ResponseTodo = {
  todos: ToDoType[];
  pages: number[];
  activeTasks: number;
};

type Params = {
  filter: FilterEnum | string | undefined;
  currentPage: number | undefined;
  userID: number | null | undefined;
};

const makeArray = (num: number) => {
  const array = [];
  while(num>0){
    array.unshift(num--);
  }
  return array;
};

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (arg: Params, thunkAPI) => {
    console.log("get todos");
    const auth = authHeader();
    const res = await axiosInstance.get<Results>("/todos/", {
      headers: auth,
      params: {
        filter: arg.filter,
        page: arg.currentPage,
        userId: arg.userID,
      },
    });
    const dsa: ResponseTodo = {
      pages: makeArray(res?.data.pages),
      todos: res?.data.todos,
      activeTasks: res?.data.activeTasks,
    };
    return dsa;
  }
);

export const addTodo = (title: string) => {
  const auth = authHeader();
  return axiosInstance.post<ToDoType>(
    "/todos/",
    { title: title },
    { headers: auth }
  );
};

export const updateTodo = (item: ToDoType) => {
  return axiosInstance.patch<ToDoType>("/todos/", item);
};

export const deleteTodo = (itemID: number) => {
  console.log(itemID);
  const auth = authHeader();
  return axiosInstance.delete<ToDoType>("/todos/", {
    data: { id: itemID },
    headers: auth,
  });
};
