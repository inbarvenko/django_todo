import React, { useEffect } from 'react';
import Select from "../UI/Select/Select";
import TaskList from "../TaskList/TaskList";
import { useAppSelector } from '../../redux/hooks';
import { TasksWithFilterWrapper } from './TasksWithFilterWrapper';
import { useNavigate } from 'react-router-dom';


const TasksWithFilter: React.FC = () => {
  const selectedFilter = useAppSelector((state) => state.todoData.filter);
  
  return (
    <TasksWithFilterWrapper>
      <div className="filter">
        <p className="filter__title">
          Filter of Tasks:
        </p>
        <Select
          value={selectedFilter}
        />
      </div>
      <TaskList/>
      
    </TasksWithFilterWrapper>
  )
}

export default TasksWithFilter;