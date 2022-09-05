import React, {useRef, useEffect, useState} from 'react'
import { useCreateNewTaskMutation } from '../../../../state/createNewTask/api';
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner';
import Task from '../TaskComponent/Task';
import classes from "./Status.module.scss";

const Status = ({statusID, name, tasks}) => {
  const [inputValue, setInputValue] = useState("");
  const [createTask, {data:result, isLoading, isSuccess}] = useCreateNewTaskMutation();

  function createNewTask(){
      const payload = {
        name: inputValue,
        status_id: statusID
      }
      createTask(payload);
      setInputValue("");
  }
  return (
    <div className={classes.statusComponent}>
        <p>{name}</p>
        {tasks && tasks.length ?
         <div className={classes.tasks}>
             {
                 tasks.map(task => {
                    return <Task key={task.id} name={task.name}/>
                })
             }
         </div> : null}
        <div className={classes.createTaskContainer}>
            <input onChange={e => setInputValue(e.target.value)} value={inputValue} placeholder='Enter a task name'/>
            {isLoading ? <LoadingSpinner width={"1.5rem"} height={"1.5rem"}/> : <button onClick={createNewTask}>✚</button>}
        </div>
    </div>
  )
}

export default Status