import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';
import KakaoLogin from "./KakaoLogin";
import "./Login.css";

const Login = () => {
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [user, setUser] = useRecoilState(userId);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };


    const handleIdChange = (e) => {
      setId(e.target.value);
    }

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }

    const handleLoginButton = (e) => {
      const fetchUser = async (email, pw) => {
        try {
          setError(null);
          setUser(null);
          setLoading(true);
          
          const response = await axios.post(`/api/user/login`,
            JSON.stringify(
              {
                id : email, 
                password : pw
              }),
            { headers }
          );
          setUser(response.data.result.userIdx);
          navigate('/home');
        } catch (error) {
          setError(error);
          alert('회원가입을 해주세요')
        }
        setLoading(false);
      }
      fetchUser(id, password);
    };

    //Kakao Login
    const {Kakao} = window;

    const loginWithKakao = () =>{
      // const href = window.location.href;
      // let params = new URL(document.location).searchParams;
      // let code = params.get("code");

      // console.log(params);
      // console.log(code);

      Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/auth/kakao/callback'
      })

    } 

    return (
      <div>
        <div>
          <div>
            Id
            <form>
              <input
                type="text"
                onChange={handleIdChange}
              />
            </form>
          </div>
          <div>
            Password
            <form>
              <input
                type="password"
                onChange={handlePasswordChange}
              />
            </form>
          </div>          
        </div> 
        <button type="button" onClick={handleLoginButton}>로그인</button>
        <button><Link to="/account">회원가입</Link></button>
        <div>
          <a href="https://kauth.kakao.com/oauth/authorize?client_id=6e8f708e0a5e4ffbacb4e5fe4c850d63&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code">
            <img
              src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
              width="222"
            />
          </a>
          <div>url에 토큰 정보 있음</div>
        </div>
      </div>
    );
}

export default Login;
