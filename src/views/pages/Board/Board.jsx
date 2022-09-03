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
import { useLazyGetBoardQuery } from '../../../state/getBoardContent/api';
import Status from './StatusComponent/Status';

const Board = () => {
  const {slug} = useParams();
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [trigger, {isLoading, data:result, isError, isSuccess}] = useLazyGetAuthUserQuery();
  const [getBoardContent, {data: boardContent, isLoading: isBoardContentLoading, isError: getBoardContentError}] = useLazyGetBoardQuery();
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
  }, [getBoardContentError]);
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
                     {boardContent && boardContent.data.userRole === "Admin" && 
                    <>
                    <div className={classes.panelHeader}>
                        <div className={classes.inviteUserContainer}>
                            <p>Invite user</p>
                            <button>Invite</button>
                        </div>  
                        {boardContent.data.isBoardOwner && 
                            <div className={classes.deleteBoardContainer}>
                               <p>Delete board</p>
                               <button>Delete</button>
                            </div>
                        }
                     </div>
                    </>}
                    <div className={classes.statusesContainer}>
                      {boardContent && 
                      boardContent.data.statuses.map(statuses => {
                        return <Status key={statuses.id} name={statuses.name} tasks = {statuses.tasks}/>
                      })}
                    </div>
                      </>
                    }
                </div>
            </div>
        </>}
    </div>
  )
}

export default Board