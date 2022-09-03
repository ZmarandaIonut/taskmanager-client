import React from 'react'
import Task from '../TaskComponent/Task';
import classes from "./Status.module.scss";

const Status = ({name, tasks}) => {
  return (
    <div className={classes.statusComponent}>
        <p>{name}</p>
        {tasks.length && 
         <div className={classes.tasks}>
             {
                 tasks.map(task => {
                    return <Task key={task.id} name={task.name}/>
                })
             }
         </div>}
        <div className={classes.createTaskContainer}>
            <p>Create task</p>
            <button>+</button>
        </div>
    </div>
  )
}

export default Status