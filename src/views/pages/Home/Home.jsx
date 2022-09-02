import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import mainPageShape from "../../resources/shapes/mainPageShape.png";
import classes from "./Home.module.scss";
import reusable from "../../resources/css/reusable.module.scss";
import { useSelector } from 'react-redux';
import LeftPanel from './LeftPanel/LeftPanel';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import CenterPanel from './CenterPanel/CenterPanel';


const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);

    useEffect(() => {     
        if(!Object.keys(user).length){
          return navigate("/login");
        }
        else{
            setIsLoading(false);
        }
    }, [])


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