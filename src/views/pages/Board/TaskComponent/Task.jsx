import React from 'react'
import classes from "./Task.module.scss";
import { useDispatch } from 'react-redux';
import { setPanelActive } from '../../../../state/Reducers/displayTaskPanel/displayTaskPanel';
import {TbSettings} from "react-icons/tb";
const Task = ({taskID,name}) => {
  const dispatch = useDispatch();
  function displayTaskPanel(){
     dispatch(setPanelActive({isPanelActive: true, payload: {
        taskID
     }
    }))
  }
  return (
    <div className={classes.taskContainer}>
        <p>{name}</p>
        <div className={classes.openTaskPanel}>
            <button onClick={displayTaskPanel}><TbSettings size={"15px"}/></button>
       </div>
    </div>
  )
}

export default Task