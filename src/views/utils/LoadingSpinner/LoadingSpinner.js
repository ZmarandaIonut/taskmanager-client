import React from 'react'
import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={classes.spinner_container}>
        <span className={classes.loader}></span>
    </div>
  )
}

export default LoadingSpinner