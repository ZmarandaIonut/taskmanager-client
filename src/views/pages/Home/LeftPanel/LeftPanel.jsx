import React, {useState} from 'react'
import classes from "./LeftPanel.module.scss";
import { useNavigate } from 'react-router-dom';
import { BiBell } from "react-icons/bi";
import { useCheckUserNotificationsQuery } from '../../../../state/checkIfUserHasNotifications/api';

const LeftPanel = ({user}) => {
  const navigate = useNavigate();
  const [isNotificationPanelActive, setNotificationPanelActive] = useState(false);
  const {data: userNotifications, isLoading} = useCheckUserNotificationsQuery();

  const logOut = () => {
    sessionStorage.removeItem("token");
    return window.location.replace("/login");
  }
  function _handleBellClick(){
    setNotificationPanelActive(true)
    return navigate("/user-notifications");
  }
  return (
    <div className={classes.mainPanel}>
      {console.log(userNotifications)}
      <div className={classes.notificationBellContainer} onClick={_handleBellClick}>
          <div className={classes.notify}>
            {userNotifications && userNotifications.data.data ? 
             <span className={classes.bellNotification}/> : null
            }
            <BiBell/>
          </div>
      </div>  
        <div className={classes.userSection}>
            <div className={classes.Usershape}>
                <p>{user.name[0].toUpperCase()}</p>
            </div>
            <div>
               <p>{user.name}</p>
            </div>
        </div>
        <div className={classes.navSection}>

        <div className={classes.navListContainer} onClick={() => navigate("/")}>
             <div className={classes.shape}/>
             <div>
                <p>Home</p>
             </div>
           </div>
          <div className={classes.navListContainer} onClick={() => navigate("/create-board")}>
             <div className={classes.shape}/>
             <div>
                <p>Create Board</p>
             </div>
           </div>

           <div className={classes.navListContainer} onClick={() => navigate("/join-board")}>
             <div className={classes.shape}/>
             <div>
                <p>Join board</p>
             </div>
           </div>

           <div className={classes.navListContainer} onClick={() => navigate("/archive")}>
             <div className={classes.shape}/>
             <div>
                <p>Archive</p>
             </div>
           </div>

           <div className={classes.navListContainer} onClick={logOut}>
             <div className={classes.shape}/>
             <div>
                <p>Log out</p>
             </div>
           </div>
        </div>
    </div>
  )
}

export default LeftPanel;
