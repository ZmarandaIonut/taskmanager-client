import React from 'react'
import classes from "./CenterPanel.module.scss";

const CenterPanel = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPanel}>
         <div className={classes.panelHeader}>
            <h1>Panel</h1>
         </div>
         <div className={classes.boards}>
            <h2>Your boards</h2>
            <div className={classes.boardsContainer}>
                <h3>Nothing to display</h3>
            </div>
         </div>
       </div>
    </div>
  )
}

export default CenterPanel