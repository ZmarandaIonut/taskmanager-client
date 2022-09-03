import React from 'react'
import classes from "./Task.module.scss";

const Task = ({name}) => {
  return (
    <div className={classes.taskContainer}>
        <p>{name}</p>
    </div>
  )
}

export default Task