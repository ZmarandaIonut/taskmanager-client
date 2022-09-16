import React from 'react'
import { useGetBoardMembersQuery } from '../../../../../state/getBoardMembers/api';
import LoadingSpinner from '../../../../utils/LoadingSpinner/LoadingSpinner';
import classes from "./DropDown.module.scss";

const DropDown = ({boardSlug, searchUser, setComment, comment, setDropDownActive, setAutoCompleteClick}) => {
    const {data: result, isLoading} = useGetBoardMembersQuery({slug: boardSlug, search: searchUser});

    function replaceUser(email){
        const newComment = comment.replace(/\@[^\s\.]+/, "@"+email);
        setComment(newComment)
        setAutoCompleteClick(email.split(".")[0]);
    }
  return (
    <div className={classes.dropDownMainContainer}>
            {isLoading ? <div className={classes.loadinContainer}><LoadingSpinner/></div> : 
            <div className={classes.container}>
            {
                result && result.data.length ? result.data.map(user => {
                    return <div key={user.id} className={classes.userContainer} onClick={() => replaceUser(user.email)}>
                                    <div className={classes.userIcon}>
                                        <p>{user.email[0].toUpperCase()}</p>
                                    </div>
                                    <p>{user.email}</p>
                            </div>
                }) : setDropDownActive(false)
            }
            </div>
            }
 
    </div>
  )
}

export default DropDown