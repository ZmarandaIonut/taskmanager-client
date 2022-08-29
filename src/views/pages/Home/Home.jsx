import React, {useEffect} from 'react'
import { useNavigate } from 'react-router';
import mainPageShape from "../../resources/shapes/mainPageShape.png";
import classes from "./Home.module.scss";
import reusable from "../../resources/css/reusable.module.scss";
import { useSelector } from 'react-redux';

const Home = () => {

    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
    
    useEffect(() => {     
        if(!Object.keys(user).length){
            return navigate("/login");
        }
    }, [])

  return (
    <div className={classes.main_container}>
        <div className={reusable.main_container_shape}>
            <img src={mainPageShape}/>
        </div>
    </div>
  )
}

export default Home