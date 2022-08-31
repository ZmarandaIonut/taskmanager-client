import React, {useEffect, useState} from 'react'
import classes from "./CenterPanel.module.scss";
import { useGetUserBoardsQuery, useGetBoardsWhereUserIsMemberQuery } from '../../../../api/apiSlice';
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner';
import Pagination from './components/Pagination';
import Board from './components/Board/Board';

const CenterPanel = () => {

  const [userBoardsPage, setUserBoardsPage] = useState(1);
  const {data: result, isLoading: isUserBoardsLoading} = useGetUserBoardsQuery(userBoardsPage);

  const [joinedBoardsPage, setJoinedBoardsPage] = useState(1);
  const {data: joinedBoards, isLoading: isJoinedBoardsLoading, isSuccess: isJoinedBoarSucces} = useGetBoardsWhereUserIsMemberQuery(joinedBoardsPage);

  return (
    <div className={classes.container}>
      <div className={classes.mainPanel}>
         <div className={classes.panelHeader}>
            <h1>Panel</h1>
         </div>
         <div className={classes.boards}>
            <h2>Your boards</h2>
            <div className={classes.boardsContainer}>
                {
                  isUserBoardsLoading ? <LoadingSpinner/> : 
                  <>
                    {result.data.boards.length ? result.data.boards.map(board => {
                        return <Board key={board.id} board={board}/>
                    }) : <h3>Nothing to display</h3>}
                  </>
                }
            </div>
            {result && result.data.lastPage > 1 ? 
              <Pagination currentPage={userBoardsPage} result={result} setPage={setUserBoardsPage}/> : null
            }
            <h2>Joined boards</h2>
            <div className={classes.boardsContainer}>
                {
                  isJoinedBoardsLoading ? <LoadingSpinner/> : 
                  <>
                    {joinedBoards.data.boards.length ? joinedBoards.data.boards.map(board => {
                        return <Board key={board.id} board={board}/>
                    }) : <h3>Nothing to display</h3>}
                  </>
                }
            </div>
            {joinedBoards && joinedBoards.data.lastPage > 1 ? 
              <Pagination currentPage={joinedBoardsPage} result={joinedBoards} setPage={setJoinedBoardsPage}/> : null
            }
         </div>
       </div>
    </div>
  )
}

export default CenterPanel