import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useChangeBoardMemberRoleMutation } from '../../../../state/changeBoardMemberRole/api';
import { useGetBoardMembersQuery } from '../../../../state/getBoardMembers/api';
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner';
import classes from "./BoardMembers.module.scss";

const BoardMembers = ({boardID, user, userRole, setDisplayBoardMembers}) => {
   const {slug} = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   const [requestedChangeRole, setRequestedChangeRole] = useState();
   const {data: result, isLoading, isError, isFetching} = useGetBoardMembersQuery({slug, page: currentPage});

   const [changeMemberRole, {isLoading: isChangeMemberRoleLoading, isSuccess: roleChanged, isError: errorRoleChange}] = useChangeBoardMemberRoleMutation();

   const nextPage = () => {
       setCurrentPage(page => page + 1);
   }
   const prevPage = () => {
       setCurrentPage(page => page - 1);
   }
   function changeBoardMemberRole(userID, role){
        const payload = {
            board_id: boardID,
            user_id: userID,
            role
        }
        changeMemberRole(payload);
        setRequestedChangeRole(userID);
   }
   useEffect(() => {
        if(roleChanged || errorRoleChange){
            setRequestedChangeRole("");
        }
   }, [roleChanged, errorRoleChange]);
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
                            <div className={classes.userIcon}>{member.email[0].toUpperCase()}</div>
                            {user.id === member.user_id ? <p>You</p> : <p>{member.email}</p>}
                         </div>
                         <div className={classes.userRoleContainer}>
                            <p className={classes.userRole}>{member.role}</p>
                         </div>
                       {userRole === "Admin" && user.id !== member.user_id ?
                          <div className={classes.editRoleBtn}>
                           {isChangeMemberRoleLoading && member.user_id === requestedChangeRole ? <LoadingSpinner width={"1.5rem"} height={"1.5rem"}/> 
                           :
                           <>
                            {member.role === "Admin" ? 
                                <button onClick={() => changeBoardMemberRole(member.user_id, "Member")}>Set as Member</button>
                                                                        :
                                <button onClick={() => changeBoardMemberRole(member.user_id, "Admin")}>Set as Admin</button>
                             }
                           </>
                           }
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