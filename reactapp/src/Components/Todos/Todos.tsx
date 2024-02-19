import { useEffect } from "react";
import InputForm from "../UI/InputForm/InputForm";
import TitleNumber from "../TitleNumber/TitleNumber";
import TasksWithFilter from "../TasksWithFilter/TasksWithFilter";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { TodosGlobalStyle, TodosWrapper } from "./TodosWrapper";
import "../../styles/imports.css";
import { ThemeProvider } from "styled-components";
import { myTheme } from "../../styles/theme";
import { getTodos, addTodo } from "../../api/todoApi";
import { getActiveTasksOnPage } from "../../redux/selectors";
import { useNavigate, useParams,  } from "react-router-dom";

const Todos: React.FC = () => {

  let { filter, page } = useParams();
  // if(!filter) {
  //   filter = 'all'
  // }
  let currentPage = 1;
  if(page) {
    currentPage = +page ;
  }
  console.log(filter, currentPage)
  const storePage = useAppSelector((state) => state.todoData.currentPage)
  const storeFilter = useAppSelector((state) => state.todoData.filter)
  const activeTasks = useAppSelector((state) => state.todoData.activeTasks);
  const userID = useAppSelector((state) => state.userData.id)
  const activeTasksOnPage = useAppSelector(getActiveTasksOnPage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        await navigate(`/todos/${storeFilter}/${storePage}`)
        await dispatch(getTodos({ filter: storeFilter, currentPage: storePage, userID }));
      } catch (err) {
        console.log(`Error! Unable to get todos! ${err}`);
      }
    })();
  }, [storeFilter, storePage, activeTasksOnPage]);

  const newTask = async (title: string) => {
    if (!title.trim()) return;

    try {
      await addTodo(title);
      await dispatch(getTodos({ filter, currentPage, userID }));
    } catch (err) {
      console.log(`Error! Unable to make a new task! ${err}`);
    }
  };

  return (
      <ThemeProvider theme={myTheme}>
        <TodosGlobalStyle />
        <div className="global__container">
          <h2 className="global__title">ToDo list</h2>
          <TodosWrapper>
            <TitleNumber
              showText="How many tasks are active:"
              showNum={activeTasks}
            />
            <InputForm taskTitle="" onClickSave={newTask} buttonName="Add" />
            <TasksWithFilter />
          </TodosWrapper>
        </div>
      </ThemeProvider>
  );
};

export default Todos;
