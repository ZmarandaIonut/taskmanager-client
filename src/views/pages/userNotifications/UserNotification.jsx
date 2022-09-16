import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetAuthUserQuery } from '../../../state/user/api';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../../state/user/user';
import LeftPanel from '../Home/LeftPanel/LeftPanel';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import classes from "./UserNotifications.module.scss";
import reusable from "../../resources/css/reusable.module.scss"
import mainPageShape from "../../resources/shapes/mainPageShape.png"
import { useGetUserNotificationsQuery } from '../../../state/getUserNotifications/api';
import Pagination from '../Home/CenterPanel/components/Pagination';
import { useDeleteNotifiactionMutation } from '../../../state/deleteNotification/api';
import { useMarkNotificationAsSeenMutation } from '../../../state/markNotificationAsSeen/api';


const UserNotification = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestChange, setRequestChange] = useState();
    const {user} = useSelector((state) => state.user);
    const [getUser, {data: userFromRequest, isSuccess: isGetUserSucces, isError: getUserError}] = useLazyGetAuthUserQuery();
    const [deleteNotification, {isLoading: isDeletingNotificationLoading}] = useDeleteNotifiactionMutation();
    const {data: result, isLoading: notificationsLoading} = useGetUserNotificationsQuery(currentPage, { refetchOnMountOrArgChange: true });
    const [markNotification, {isLoading: markNotificationLoading}] = useMarkNotificationAsSeenMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {     
        if(!Object.keys(user).length){
           getUser();
        }
        else{
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
       if(getUserError){
        return navigate("/login");
       }
       if(isGetUserSucces){
          dispatch(addUser(userFromRequest.data.user));
          setIsLoading(false);
       }
    }, [getUserError,isGetUserSucces]);

    function _handleDeleteNotification(id){
        setRequestChange(id);
        deleteNotification(id);
    }

    function _handleMarkTaskAsSeen(notificationID){
        const payload = {
            id: notificationID
        }
        setRequestChange(notificationID);
        markNotification(payload);
    }
    function nextPage(){
        setCurrentPage(page => page + 1);
    }
    function prevPage(){
        setCurrentPage(page => page - 1);
    }

  return (
    <div className={classes.mainContainer}>
         {!isLoading ? <>
            <LeftPanel user={user}/>
            <div className={reusable.main_container_shape}>
                <img alt="shape" src={mainPageShape}/>
            </div>
            <div className={classes.container}>
                <div className={classes.mainPanel}>
                    <div className={classes.panelHeader}>
                        <h1>Notifications</h1>
                    </div>
                    <div className={classes.notificationsContainer}>
                        {result && result.data.notifications.length === 0 ? <div className={classes.anno}>
                            <h3>Nothing to display</h3>
                        </div> : null}
                        {notificationsLoading ? <div className={classes.loadingContainer}><LoadingSpinner/></div> :
                           <>
                            {result && result.data.notifications.map(notif => {
                                   return( <div key={notif.id} className={classes.notification}>
                                         <p>{notif.message}</p>
                                        <div className={classes.btns}>
                                            {notif.seen === 0 ? markNotificationLoading && requestChange === notif.id ? requestChange === notif.id && <LoadingSpinner width={"1.5rem"} height={"1.5rem"}/> 
                                                                                   : 
                                            <button className={classes.markNotification} onClick={() => _handleMarkTaskAsSeen(notif.id)}>Mark</button> : null

                                            }
                                            {isDeletingNotificationLoading && requestChange === notif.id ? <LoadingSpinner width={"1.5rem"} height={"1.5rem"}/> 
                                                                            :
                                            <button className={classes.deleteNotification} onClick={() => _handleDeleteNotification(notif.id)}>Delete</button>
                                            }
                                         </div>
                                     </div>)
                            })}
                           </> 
                        }
                    </div>
                    {result && result.data.notifications.length > 0 && <div className={classes.pagination}>
                          <p>{result.data.currentPage} / {result.data.lastPage}</p>
                          {result.data.hasMorePages && <button onClick={nextPage}>Next page</button>}
                          {result.data.currentPage > 1 && <button onClick={prevPage}>Prev page</button>}
                           
                      </div>}
                </div>
            </div>
        </> : <LoadingSpinner/>}
    </div>
  )
}

export default UserNotification