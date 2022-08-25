import React from 'react'
import { useLoginUserMutation } from '../../../api/apiSlice'

const Login = () => {
    const [loginUser, {data: result, isLoading, isSuccess}] = useLoginUserMutation();
    function _handleLoginUser(){
        const payload = {
            email: "admin@yahoo.com",
            password: "admin123"
        };
        loginUser(payload);
    }
    if(isSuccess){
        sessionStorage.setItem("token", result.data.token);
    }
  return (
    <div>
        <button onClick={_handleLoginUser}>Fetch</button>
    </div>
  )
}

export default Login