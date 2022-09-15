import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCommentMutation } from '../../../../state/createTaskComment/api';
import { useGetTaskCommentsQuery } from '../../../../state/getTaskComments/api';
import { setPanelStatus } from '../../../../state/Reducers/displayTaskComments/displayTaskComments';
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner';
import { FiClock } from "react-icons/fi";
import classes from "./TaskComponent.module.scss";
import { useDeleteTaskCommentsMutation } from '../../../../state/deleteUserComment/api';

const TaskCommentsComponent = ({boardID}) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [requestDelete, setRequestDelete] = useState();
    const [comment, setComment] = useState("");
    const {taskComments} = useSelector((state) => state.taskComments)
    const {user} = useSelector((state) => state.user);
    const [createComment, {isLoading: isLoadingCreateTask}] = useCreateCommentMutation();
    const {data, isLoading: commentsLoading} = useGetTaskCommentsQuery({id: taskComments.payload.taskID, page});
    const [deleteTaskComment, {isLoading: isDeletingCommentLoading, isSuccess: succesed, isError: deleteError}] = useDeleteTaskCommentsMutation();

    function closePanelTab(){
        dispatch(setPanelStatus({
            isPanelActive: false,
        }))
    }
    function createNewComment(){
        const payload = {
            comment: comment,
            task_id: taskComments.payload.taskID,
            board_id: boardID
        }
        createComment(payload);
        setComment("");
    }
    function nextPage(){
        setPage(page => page + 1);
    }
    function prevPage(){
        setPage(page => page - 1);
    }
    function deleteComment(id){
        setRequestDelete(id);
        deleteTaskComment(id);
    }
  return (
    <div className={classes.mainContainer}>
        <div className={classes.commentsPanel}>
         <div className={classes.closeTab} onClick={closePanelTab}>
                <button>✖</button>
            </div>
            <div className={classes.panelHeader}>
                <h2>Comments</h2>
            </div>
            <div className={classes.addCommentContainer}>
                <input onChange={(e) => setComment(e.target.value)} placeholder='Add comment' value={comment}/>
             
                {isLoadingCreateTask ? <div className={classes.createTaskLoading}><LoadingSpinner width={"1.5rem"} height={"1.5rem"}/></div> : <button onClick={createNewComment}>✚</button>}
                 
            </div>
            <div className={classes.commentsPanel}>
                {commentsLoading ? <div className={classes.loadingContainer}><LoadingSpinner/></div> : 
                <>
                {data && data.data.comments.length === 0 ? <div className={classes.noContent}><h3>Nothing to display</h3></div> : 
                <div className={classes.commentsContainer}>
                    {data && data.data.comments.map(comment => {
                      return <div key={comment.id} className={classes.comment}>
                                {comment.id === requestDelete && isDeletingCommentLoading ? <LoadingSpinner/> : 
                                <>
                                {
                                   comment.user_email === user.email && 
                                   <div className={classes.removeComment}>
                                     <button onClick={() => deleteComment(comment.id)}>✖</button>
                                  </div> 
                                }
                                </>
                                }
 
                            <div className={classes.commentCreatedBy}>
                                 <p><strong>Created by:</strong> {comment.user_email}</p>
                            </div>
                             <p><strong>Message:</strong> {comment.comment}</p>
                             <div className={classes.created_at}>
                                <FiClock/>
                                <p>{new Date(comment.created_at).toLocaleDateString()}</p>
                             </div>
                        </div>
                    })}
                </div>
                }
                </>
               }
            </div>
            {data && data.data.comments.length > 0 && <div className={classes.pagination}>
                          <p>{data.data.currentPage} / {data.data.lastPage}</p>
                          {data.data.hasMorePages && <button onClick={nextPage}>Next page</button>}
                          {data.data.currentPage > 1 && <button onClick={prevPage}>Prev page</button>}
                           
                     </div>
          }
        </div>
    </div>
  )
}

export default TaskCommentsComponent