import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import classes from "./Board.module.scss";
import reusable from "../../resources/css/reusable.module.scss";
import mainPageShape from "../../resources/shapes/mainPageShape.png";
import LeftPanel from '../Home/LeftPanel/LeftPanel';
import LoadingSpinner from "../../utils/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from 'react-redux';
import {useLazyGetAuthUserQuery} from '../../../state/user/api';
import { addUser } from '../../../state/user/user';
import { board, useLazyGetBoardQuery } from '../../../state/getBoardContent/api';
import Status from './StatusComponent/Status';
import { FaUserFriends } from 'react-icons/fa';
import BoardMembers from './BoardMembersComponent/BoardMembers';
import CreateStatuses from './CreateStatusesComponent/CreateStatuses';
import TaskPanel from './TaskPanelComponent/TaskPanel';
import { setPanelActive } from '../../../state/Reducers/displayTaskPanel/displayTaskPanel';

const Board = () => {
  const {slug} = useParams();
  const {user} = useSelector((state) => state.user);
  const [displayBoardMembers, setDisplayBoardMembers] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [trigger, {isLoading, data:result, isError, isSuccess}] = useLazyGetAuthUserQuery();
  const [getBoardContent, {data: boardContent, isLoading: isBoardContentLoading, isError: getBoardContentError}] = useLazyGetBoardQuery();
 
  const {taskPanel} = useSelector((state) => state.taskPanel);

  useEffect(() => {
    if(Object.keys(user).length === 0){
        trigger();
     }
     else{
        getBoardContent(slug);
     }
  }, [user])
  useEffect(() => {
      if(isError){
        return navigate("/login");
      }
      if(isSuccess && result){
        dispatch(addUser(result.data.user));
      }
  }, [isError, isSuccess])
  useEffect(() => {
      if(getBoardContentError){
        return navigate("/");
      }
      if(taskPanel.isPanelActive){
        dispatch(setPanelActive({
          isPanelActive: false,
          payload: {}
        }))
      }
  }, [getBoardContentError, boardContent]);
  return (
    <div className={classes.mainContainer}>
        {Object.keys(user).length && 
        <>
            <div className={reusable.main_container_shape}>
                <img src={mainPageShape}/>
            </div>
            <LeftPanel user={user}/>
            <div className={classes.container}>
                <div className={classes.mainPanel}>
                  {isBoardContentLoading ?                
                    <div className={classes.loadingContent}>
                       <LoadingSpinner/>
                    </div> :
                      <>
                    <div className={classes.panelHeader}>
                     {boardContent && boardContent.data.userRole === "Admin" && 
                        <div className={classes.inviteUserContainer}>
                            <p>Invite user</p>
                            <button>Invite</button>
                        </div>  
                      }
                        {boardContent && boardContent.data.isBoardOwner ?
                            <div className={classes.deleteBoardContainer}>
                               <p>Delete board</p>
                               <button>Delete</button>
                            </div> : null
                        }
                        <div className={classes.boardMembersContainer} onClick={() => setDisplayBoardMembers(true)}>
                            <p>Members</p>
                            <div>
                                <FaUserFriends size={25}/>
                            </div>
                        </div>
                     </div>
                     {boardContent && boardContent.data.userRole === "Admin" ? <CreateStatuses boardID={boardContent.data.board_id}/> : null}
                     {boardContent && boardContent.data.statuses.length === 0 ? <div className={classes.noContent}><h3>This board has no content</h3></div> : 
                        <div className={classes.statusesContainer}>
                            {boardContent && 
                              boardContent.data.statuses.map(statuses => {
                                  return <Status
                                               key={statuses.id}
                                               userRole = {boardContent.data.userRole}
                                               statusID = {statuses.id}
                                               name={statuses.name}
                                               tasks = {statuses.tasks}/>
                           })}
                        </div>
                     }
                      </>
                    }
                    {boardContent && displayBoardMembers && <BoardMembers 
                                                                  boardID={boardContent.data.board_id} 
                                                                  user={user} 
                                                                  userRole = {boardContent.data.userRole} 
                                                                  setDisplayBoardMembers={setDisplayBoardMembers}
                                                                  />
                    }
                    {console.log(taskPanel)}
                 {boardContent && taskPanel.isPanelActive && <TaskPanel boardID = {boardContent.data.board_id}/>}
                </div>
            </div>
        </>}
    </div>
  )
}

export default Board