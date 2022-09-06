import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAssignUserToTaskMutation } from '../../../../state/assignUserToTask/api';
import { setPanelActive } from '../../../../state/Reducers/displayTaskPanel/displayTaskPanel';
import classes from "./TaskPanel.module.scss";

const TaskPanel = ({boardID}) => {
    const dispatch = useDispatch();
    const {taskPanel} = useSelector((state) => state.taskPanel)
    const [assignUserToTask, {data, isError, isSuccess, error}] = useAssignUserToTaskMutation();
    const [userEmail, setUserEmail] = useState();
    function closePanelTab(){
        dispatch(setPanelActive({
            isPanelActive: false,
            payload: {}
        }))
    }
    function assignUser(){
       const payload = {
         task_id: taskPanel.payload.taskID,
         board_id: boardID,
         email: userEmail
       }
       assignUserToTask(payload);
    }
  return (
    <div className={classes.mainContainer}>
        {console.log(isSuccess, error)}
        <div className={classes.taskPanel}>
            <div className={classes.closeTab} onClick={closePanelTab}>
                <button>✖</button>
            </div>
            <div className={classes.panelHeader}>
                <h2>Task Panel</h2>
            </div>
            <div className={classes.assignUserContainer}>
                    <input onChange={(e) => setUserEmail(e.target.value)} placeholder='Enter member board email'/>
                    <button onClick={assignUser}>Assign</button>
            </div>
            <div className={classes.assignedUsersContainer}>
                <h2>Assigned users</h2>
            </div>
        </div>
    </div>
  )
}

export default TaskPanel