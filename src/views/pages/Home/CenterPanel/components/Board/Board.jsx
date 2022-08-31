import React from 'react'
import classes from "./Board.module.scss";
const Board = ({board}) => {
  return (
    <div key={board.id} className={classes.boardComponent}>
        <p>{board.name}</p>
    </div>
  )
}

export default Board