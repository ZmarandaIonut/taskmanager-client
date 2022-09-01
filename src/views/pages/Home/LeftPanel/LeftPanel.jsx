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
              <p>{user.name}e</p>
            </div>
        </div>
        <div className={classes.navSection}>

        <div className={classes.navListContainer}>
             <div className={classes.shape}/>
             <div onClick={() => navigate("/")}>
                <p>Home</p>
             </div>
           </div>
          <div className={classes.navListContainer}>
             <div className={classes.shape}/>
             <div onClick={() => navigate("/create-board")}>
                <p>Create Board</p>
             </div>
           </div>

           <div className={classes.navListContainer}>
             <div className={classes.shape}/>
             <div onClick={() => navigate("/join-board")}>
                <p>Join board</p>
             </div>
           </div>

           <div className={classes.navListContainer}>
             <div className={classes.shape}/>
             <div>
                <p>Archived boards</p>
             </div>
           </div>

           <div className={classes.navListContainer}>
             <div className={classes.shape}/>
             <div>
                <p>Archived tasks</p>
             </div>
           </div>

           <div className={classes.navListContainer}>
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
