import React from "react";
import Task from "../Task/Task";
import { TaskListWrapper } from "./TaskListWrapper";
import Button from "../UI/Button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCurrentPage } from "../../redux/toDoList";
import { filteredToDoList } from "../../redux/selectors";


const TaskList: React.FC = () => {

  const toDoList = useAppSelector((state) => state.todoData.toDoList);
  const pages = useAppSelector((state) => state.todoData.pages);
  const currentPage = useAppSelector((state) => state.todoData.currentPage);
  const dispatch = useAppDispatch();

  const changeCurrentPage = (event: React.MouseEvent<HTMLButtonElement>, parametr: number) => {
    if(parametr !== currentPage){
      dispatch(setCurrentPage(parametr));
    }
  }


  return (
    <TaskListWrapper>
      {toDoList.length
        ?
        toDoList.map((item) => {
          return (
            <Task
              task={item}
              // onChange = {triggerRerenderList}
              key={item.id}
            />
          )
        })
        : <p className="explanations">No tasks</p>
      }
      <div className="buttonsContainer">
        {pages.length>1 && pages.map((page) => {
          return (
            <Button
              title={page.toString()}
              onClick={(e) => changeCurrentPage(e, page)}
              isButtonActive={(page === currentPage)}
              key={page}
            />
          )
        })}
      </div>
      {toDoList.length
        ? <p className="explanations">
          To edit task use doubleclick on chosen one.
          To save edit of task press Enter, to cancel push mouse somewhere else.
        </p>
        : null}
    </TaskListWrapper>
  );
}

export default TaskList;