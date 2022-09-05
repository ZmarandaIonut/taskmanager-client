import React, {useRef} from 'react'
import { useCreateBoardMutation } from '../../../../state/boards/api';
import { useCreateNewStatusMutation } from '../../../../state/createNewStatus/api';
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner';
import classes from "./CreateStatuses.module.scss";

const CreateStatuses = ({boardID}) => {
  const inputRef = useRef();

  const [createStatus, {isSuccess, isLoading, isError}] = useCreateNewStatusMutation();

  function createBoardStatus(){
    const payload = {
        name : inputRef.current.value,
        board_id: boardID
    }
    createStatus(payload);
  }
  return (
    <div className={classes.mainContainer}>
        <input placeholder='Enter a status name' ref={inputRef}/>
        {isLoading ? <LoadingSpinner width={"1.5rem"} height={"1.5rem"}/> : <button onClick={createBoardStatus}>✚</button>}
    </div>
  )
}

export default CreateStatuses