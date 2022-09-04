import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import { useGetBoardMembersQuery } from '../../../../state/getBoardMembers/api';
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner';
import classes from "./BoardMembers.module.scss";

const BoardMembers = ({user, userRole, setDisplayBoardMembers}) => {
   const {slug} = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   const {data: result, isLoading, isError, isFetching} = useGetBoardMembersQuery({slug, page: currentPage});

   const nextPage = () => {
       setCurrentPage(page => page + 1);
   }
   const prevPage = () => {
       setCurrentPage(page => page - 1);
   }
  return (
    <div className={classes.mainContainer}>
        <div className={classes.userBoardsContainer}>
            <div className={classes.closeTab} onClick={() => setDisplayBoardMembers(false)}>
                <button>✖</button>
            </div>
            <div className={classes.panelTitle}>
               <h2>Board members</h2>
            </div>
            {isError ? <div className={classes.appError}><p>Something went wrong, please try again later</p></div> : 
            <>
            {isLoading || isFetching ? <div className={classes.loadingContainer}><LoadingSpinner/></div> : 
            <div className={classes.displayMembersContainer}>
            {result && result.data.members.map(member => {
                return(
                    <div className={classes.memberComponent} key={member.user_id}>
                         <div className={classes.userNameContainer}>
                            <div className={classes.userIcon}>{member.name[0].toUpperCase()}</div>
                            <p>{member.name}</p>
                         </div>
                         <div className={classes.userRoleContainer}>
                            <p className={classes.userRole}>{member.role}</p>
                         </div>
                       {userRole === "Admin" && user.id !== member.user_id ?
                          <div className={classes.editRoleBtn}>
                             {member.role === "Admin" ? <button>Set as Member</button> : <button>Set as Admin</button>}
                         </div> : null}
                    </div>
                )
            })}
          </div>} 
         </> 
        }
            {result && <div className={classes.pagination}>
                          <p>{result.data.currentPage} / {result.data.lastPage}</p>
                          {result.data.hasMorePages && <button onClick={nextPage}>Next page</button>}
                          {result.data.currentPage > 1 && <button onClick={prevPage}>Prev page</button>}
                           
                      </div>}
        </div>  
    </div>
  )
}

export default BoardMembers