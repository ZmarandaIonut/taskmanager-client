import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import mainPageShape from "../../resources/shapes/mainPageShape.png";
import classes from "./Home.module.scss";
import reusable from "../../resources/css/reusable.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import LeftPanel from './LeftPanel/LeftPanel';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import CenterPanel from './CenterPanel/CenterPanel';
import { addUser } from '../../../state/user/user';
import { useLazyGetAuthUserQuery } from '../../../state/user/api';


const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
    const [getUser, {data: userFromRequest, isSuccess: isGetUserSucces, isError: getUserError}] = useLazyGetAuthUserQuery();
    const dispatch = useDispatch();

    useEffect(() => {     
        if(!Object.keys(user).length){
           getUser();
        }
        else{
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
       if(getUserError){
        return navigate("/login");
       }
       if(isGetUserSucces){
          dispatch(addUser(userFromRequest.data.user));
          setIsLoading(false);
       }
    }, [getUserError,isGetUserSucces]);

  return (
    <div className={classes.main_container}>
        <div className={reusable.main_container_shape}>
            <img src={mainPageShape}/>
        </div>
        {!isLoading ? <>
            <LeftPanel user={user}/>
            <CenterPanel/>
        </> : <LoadingSpinner/>}
    </div>
  )
}

export default Home