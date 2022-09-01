import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LeftPanel.module.scss";

const LeftPanel = ({ user }) => {
  const navigate = useNavigate();

  const _joinBoard = () => {
    return navigate("/join-board");
  };
  return (
    <div className={classes.mainPanel}>
      <div className={classes.userSection}>
        <div className={classes.Usershape}>
          <p>{user.name[0].toUpperCase()}</p>
        </div>
        <div>
          <p>{user.name}e</p>
        </div>
      </div>
      <div className={classes.navSection}>
        <div className={classes.navListContainer}>
          <div className={classes.shape} />
          <div>
            <p>Create board</p>
          </div>
        </div>

        <div className={classes.navListContainer}>
          <div className={classes.shape} />
          <div>
            <p onClick={_joinBoard}>Join board</p>
          </div>
        </div>

        <div className={classes.navListContainer}>
          <div className={classes.shape} />
          <div>
            <p>Archived boards</p>
          </div>
        </div>

        <div className={classes.navListContainer}>
          <div className={classes.shape} />
          <div>
            <p>Archived tasks</p>
          </div>
        </div>

        <div className={classes.navListContainer}>
          <div className={classes.shape} />
          <div>
            <p>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
