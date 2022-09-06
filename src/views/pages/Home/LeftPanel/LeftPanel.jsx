import React from 'react'
import classes from "./LeftPanel.module.scss";
import { useNavigate } from 'react-router-dom';
const LeftPanel = ({user}) => {
  const navigate = useNavigate();
  return (
    <div className={classes.mainPanel}>
        <div  className={classes.userSection}>
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

           <div className={classes.navListContainer} onClick={()=>{sessionStorage.clear("token"); navigate("/login")}}>
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
