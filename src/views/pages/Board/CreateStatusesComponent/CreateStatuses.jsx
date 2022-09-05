import React, {useRef, useState} from 'react'
import { useCreateNewStatusMutation } from '../../../../state/createNewStatus/api';
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner';
import classes from "./CreateStatuses.module.scss";

const CreateStatuses = ({boardID}) => {
  const [inputValue, setInputValue] = useState("");
  const [createStatus, {isLoading, isError}] = useCreateNewStatusMutation();

  function createBoardStatus(){
    const payload = {
        name : inputValue,
        board_id: boardID
    }
    createStatus(payload);
    setInputValue("");
  }
  return (
    <div className={classes.mainContainer}>
        <input onChange={e => setInputValue(e.target.value)} placeholder='Enter a status name' value={inputValue}/>
        {isLoading ? <LoadingSpinner width={"1.3rem"} height={"1.3rem"}/> : <div className={classes.addStatusesContainer}><button onClick={createBoardStatus}>✚</button></div>}
    </div>
  )
}

export default CreateStatuses