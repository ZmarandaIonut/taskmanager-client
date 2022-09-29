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
import FakeHomePageInterface from '../../utils/HomePageLoading/FakeHomePageInterface';


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
    }, [])

    useEffect(() => {
       if(getUserError){
        return navigate("/login");
       }
       if(isGetUserSucces){
          dispatch(addUser(userFromRequest.data.user));
       }
    }, [getUserError,isGetUserSucces]);

  return (
    <div className={classes.main_container}>
        <div className={reusable.main_container_shape}>
            <img src={mainPageShape}/>
        </div>
        {console.log(isLoading)}
        {Object.keys(user).length === 0 ? <FakeHomePageInterface/> :
            <>
            <LeftPanel user={user}/>
            <CenterPanel/>
            </>
            } 
    </div>
  )
}

export default Home