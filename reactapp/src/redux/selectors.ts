import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./hooks";
import { FilterEnum } from "../types";

export const  currentToDoList = (state : RootState) => state.todoData.toDoList;

export const currentFilter = (state : RootState) => state.todoData.filter;

export const getActiveTasksOnPage = (state : RootState) => {
  const arr = state.todoData.toDoList.filter((item) => !item.completed);
  return arr.length;
}

export const filteredToDoList = createSelector(
  [currentToDoList, currentFilter],
  (todo, filter) => {
    switch (filter) {
      case FilterEnum.active:
        return todo.filter((item) => !item.completed);
      case FilterEnum.completed:
        return todo.filter((item) => item.completed);
      default:
        return todo;
    }
  }
)