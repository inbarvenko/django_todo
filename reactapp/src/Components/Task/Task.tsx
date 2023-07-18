import React, { useState } from "react";
import Button from "../UI/Button/Button";
import InputForm from "../UI/InputForm/InputForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeStatusTask, changeTitleTask } from "../../redux/toDoList";
import { ToDoType } from "../../types";
import { TaskWrapper } from "./TaskWrapper";
import { deleteTodo, getTodos, updateTodo } from "../../api/todoApi";


interface Props {
  task: ToDoType;
}

const Task: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState(false);

  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.todoData.filter)
  const currentPage = useAppSelector((state) => state.todoData.currentPage)
  const userID = useAppSelector((state) => state.userData.id)


  const editTask = () => {
    setEdit(!edit);
  }

  const changeTitle = async (title: string) => {

    const titleTrim = title.trim();
    try {
      if (titleTrim) {
        await updateTodo({
          title: titleTrim,
          id: props.task.id,
          completed: props.task.completed
        });
        dispatch(changeTitleTask({
          id: props.task.id,
          title: titleTrim
        }));
      }
    }
    catch (err) {
      console.log(`Error! Unable to change title of task! ${err}`);
    }

    editTask();
  }

  const doneTask = async () => {
    try {
      await updateTodo({
        title: props.task.title,
        id: props.task.id,
        completed: !props.task.completed,
      });

      dispatch(changeStatusTask(props.task.id));
    }
    catch (err) {
      console.log(`Error! Unable to change status of task! ${err}`);
    }
  }

  const onButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await deleteTodo(props.task.id);
      await dispatch(getTodos({filter, currentPage, userID}))

    }
    catch (err) {
      console.log(`Error! Unable to delete a task! ${err}`);
    }
  }

  return (
    <TaskWrapper
      isDone={props.task.completed}
    >
      <input
        className="input"
        type="checkbox"
        checked={props.task.completed}
        onChange={doneTask} />

      {edit
        ? <InputForm
          taskTitle={props.task.title}
          onClickSave={changeTitle}
          isButtonDisabled={true}
          buttonType="edit"
        />
        : <>
          <p
            onDoubleClick={editTask}
            className="text">
            {props.task.title}
          </p>
        </>}
      <Button
        onClick={onButtonClick}
        title="Delete"
      />
    </TaskWrapper>
  )
}

export default Task;