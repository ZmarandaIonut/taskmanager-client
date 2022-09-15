import React from 'react'
import classes from "./Task.module.scss";
import { useDispatch } from 'react-redux';
import { setPanelActive } from '../../../../state/Reducers/displayTaskPanel/displayTaskPanel';
import { setPanelStatus } from '../../../../state/Reducers/displayTaskComments/displayTaskComments';
import {TbSettings} from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
const Task = ({taskID,name, isActive}) => {
  const dispatch = useDispatch();
  function displayTaskPanel(){
     dispatch(setPanelActive({isPanelActive: true, payload: {
        taskID,
        isActive
     }
    }))
  }
  function displayCommentsPanel(){
      dispatch(setPanelStatus({isPanelActive: true, payload: {taskID}}));
  }
  return (
    <div className={isActive ? classes.taskContainer : classes.taskContainerInactive}>
        <p>{name}</p>
        <div className={classes.openTaskComments}>
            <button onClick={displayCommentsPanel}><BiCommentDetail/></button>
        </div>
        <div className={classes.openTaskPanel}>
            <button onClick={displayTaskPanel}><TbSettings size={"15px"}/></button>
       </div>
    </div>
  )
}

export default Task