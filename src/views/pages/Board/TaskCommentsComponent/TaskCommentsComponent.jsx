import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCommentMutation } from "../../../../state/createTaskComment/api";
import { useGetTaskCommentsQuery } from "../../../../state/getTaskComments/api";
import { setPanelStatus } from "../../../../state/Reducers/displayTaskComments/displayTaskComments";
import LoadingSpinner from "../../../utils/LoadingSpinner/LoadingSpinner";
import { FiClock } from "react-icons/fi";
import classes from "./TaskComponent.module.scss";
import { useDeleteTaskCommentsMutation } from "../../../../state/deleteUserComment/api";
import DropDown from "./DropDown";
import { useParams } from "react-router-dom";
import { generateMessage } from "./TaskCommments.logic";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const TaskCommentsComponent = ({ boardID, userRole }) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [requestDelete, setRequestDelete] = useState();
  const [comment, setComment] = useState("");
  const [getTaskComments, setTaskComments] = useState([]);
  const [getAddedTask, setAddedTask] = useState();
  const [isDropDownActive, setDropDownActive] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [hasUserClickOnAutoComplete, setAutoCompleteClick] = useState("");
  const [appError, setAppError] = useState();
  const { taskComments } = useSelector((state) => state.taskComments);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    window.Pusher = Pusher;

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: process.env.REACT_APP_WEBSOCKETS_KEY,
      wsHost: process.env.REACT_APP_WEBSOCKETS_SERVER,
      wsPort: 6001,
      forceTLS: false,
      disableStatus: true,
      enabledTransports: ["ws", "wss"],
    });
  }, []);
  if (window?.Echo) {
    window.Echo.channel(`user.${user.id}`).listen("SendEventToClient", (e) => {
      if (e.action === "comments") {
        if (e.content.task_id === taskComments.payload.taskID) {
          return setTaskComments([e.content, ...getTaskComments]);
        }
      }
      if (
        e.action === "delete_comment" &&
        taskComments.payload.taskID === e.content.task_id
      ) {
        return setTaskComments((prev) =>
          prev.filter((comment) => comment.id !== +e.content.comment_id)
        );
      }
    });
  }

  const [
    createComment,
    {
      isLoading: isLoadingCreateTask,
      isSuccess: commentCreated,
      isError: createCommentError,
      error,
    },
  ] = useCreateCommentMutation();
  const { data, isLoading: commentsLoading } = useGetTaskCommentsQuery({
    id: taskComments.payload.taskID,
    page,
  });
  const [
    deleteTaskComment,
    {
      isLoading: isDeletingCommentLoading,
      isSuccess: succesed,
      isError: deleteError,
    },
  ] = useDeleteTaskCommentsMutation();

  function closePanelTab() {
    dispatch(
      setPanelStatus({
        isPanelActive: false,
      })
    );
  }
  function createNewComment() {
    const payload = {
      comment: comment,
      task_id: taskComments.payload.taskID,
      board_id: boardID,
      tagged_user_email: searchUser,
    };
    createComment(payload);
    setComment("");
  }
  function nextPage() {
    setPage((page) => page + 1);
  }
  function prevPage() {
    setPage((page) => page - 1);
  }
  function deleteComment(id) {
    setRequestDelete(id);
    deleteTaskComment(id);
  }
  useEffect(() => {
    const result = comment.match(/\@[^\s\.]+/);
    if (result) {
      const getUser = result[0].slice(1);
      const getEmailFromResult = result.input.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
      );
      if (getEmailFromResult) {
        setSearchUser(getEmailFromResult[0]);
      }
      if (getUser) {
        if (
          (getEmailFromResult &&
            getEmailFromResult[0] === hasUserClickOnAutoComplete) ||
          getEmailFromResult
        ) {
          return setDropDownActive(false);
        } else {
          setSearchUser(getUser);
          setDropDownActive(true);
        }
      }
    } else {
      setSearchUser("");
    }
  }, [comment]);

  useEffect(() => {
    if (commentCreated) {
      setAppError("");
    }
  }, [commentCreated]);

  useEffect(() => {
    if (createCommentError) {
      setAppError(error.data.message);
    }
  }, [createCommentError]);
  useEffect(() => {
    if (data) {
      setTaskComments(data.data.comments);
    }
  }, [data]);
  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.commentsPanel}
        onClick={() => setDropDownActive(false)}
      >
        <div className={classes.closeTab} onClick={closePanelTab}>
          <button>✖</button>
        </div>
        <div className={classes.panelHeader}>
          <h2>Comments</h2>
        </div>
        {isDropDownActive ? (
          <DropDown
            boardSlug={slug}
            searchUser={searchUser}
            setComment={setComment}
            comment={comment}
            setDropDownActive={setDropDownActive}
            setAutoCompleteClick={setAutoCompleteClick}
          />
        ) : null}
        <div className={classes.addComentMainContainer}>
          <div className={classes.addCommentContainer}>
            <input
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment"
              value={comment}
            />
            {isLoadingCreateTask ? (
              <div className={classes.createTaskLoading}>
                <LoadingSpinner width={"1.5rem"} height={"1.5rem"} />
              </div>
            ) : (
              <button onClick={createNewComment}>✚</button>
            )}
          </div>
          {appError && (
            <div className={classes.appError}>
              <p>{appError}</p>
            </div>
          )}
        </div>

        <div className={classes.commentsPanel}>
          {commentsLoading ? (
            <div className={classes.loadingContainer}>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {getTaskComments && getTaskComments.length === 0 ? (
                <div className={classes.noContent}>
                  <h3>Nothing to display</h3>
                </div>
              ) : (
                <div className={classes.commentsContainer}>
                  {getTaskComments &&
                    getTaskComments.map((comment) => {
                      return (
                        <div key={comment.id} className={classes.comment}>
                          {comment.id === requestDelete &&
                          isDeletingCommentLoading ? (
                            <div className={classes.deleteCommentLoading}>
                              <LoadingSpinner
                                width={"1.5rem"}
                                height={"1.5rem"}
                              />
                            </div>
                          ) : (
                            <>
                              {(comment.user_email === user.email ||
                                userRole === "Admin") && (
                                <div className={classes.removeComment}>
                                  <button
                                    onClick={() => deleteComment(comment.id)}
                                  >
                                    ✖
                                  </button>
                                </div>
                              )}
                            </>
                          )}

                          <div className={classes.commentCreatedBy}>
                            <p>
                              <strong>Created by:</strong> {comment.user_email}
                            </p>
                          </div>

                          <p>
                            <strong>Message:</strong>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: generateMessage(comment.comment),
                              }}
                            />
                          </p>
                          <div className={classes.created_at}>
                            <FiClock />
                            <p>
                              {new Date(comment.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </>
          )}
        </div>
        {data && data.data.comments.length > 0 && (
          <div className={classes.pagination}>
            <p>
              {data.data.currentPage} / {data.data.lastPage}
            </p>
            {data.data.hasMorePages && (
              <button onClick={nextPage}>Next page</button>
            )}
            {data.data.currentPage > 1 && (
              <button onClick={prevPage}>Prev page</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCommentsComponent;
