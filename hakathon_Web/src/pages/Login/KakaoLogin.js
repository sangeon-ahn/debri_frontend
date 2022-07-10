import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code"); 




  // calllback으로 받은 인가코드


  const getToken = async () => {
    const bodyData = {
        grant_type : "authorization_code",
        client_id : process.env.REACT_APP_KAKAO_CLIENT_ID,
        redirect_uri : process.env.REACT_APP_KAKAO_REDIRECT_URL,
        code : code
    }
    console.log(bodyData)

    const queryStringBody = Object.keys(bodyData)
        .map(k=> encodeURIComponent(k)+"="+encodeURI(bodyData[k]))
        .join("&")

    console.log(queryStringBody)

    fetch("https://kauth.kakao.com/oauth/token",{
        method : "POST",
        headers : {
            'content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body : queryStringBody
    })
    .then(res => res.json())
    .then((data)=>{
        console.log(data)
    })

    navigate('/home');
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>로그인~</div>
  );
};

export default Auth;