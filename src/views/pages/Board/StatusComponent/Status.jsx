import React from 'react'
import classes from "./Status.module.scss";

const Status = ({name, task}) => {
  return (
    <div className={classes.statusComponent}>
        <p>{name}</p>
        <div className={classes.createTaskContainer}>
            <p>Create task</p>
            <button>+</button>
        </div>
    </div>
  )
}

export default Status