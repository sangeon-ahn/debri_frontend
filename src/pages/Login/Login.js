import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import onlylogo from '../../assets/ONLY_LOGO.png';
import logoType from '../../assets/LOGO_TYPE.png';
import './Login.css';
import capsLockIcon from '../../assets/capsLockIcon.png';

// 초기값 공백 지정 useState
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const setLocalstorage = (loginData) => {
    localStorage.setItem("userData", JSON.stringify(loginData));
  };

  async function postData(email, pwd) {
    try {
      const response = await axios.post(`/api/auth/login`,
        JSON.stringify(
          {
            email : email,
            pwd : pwd
          }),
        { headers });
      console.log('리턴', response);
      if (response.data.isSuccess) {
        setLocalstorage(response.data.result);
        navigate('/board');
      } else {
        alert(" 아이디 혹은 비밀번호를 확인해 주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  }
    const goToAccount = () => {
      navigate("/account");
    };

    const goToMain = () => {
      console.log(email, password);
       postData(email, password);
    }


    return (
      <div className='login'>
        <div className='Logo_box'>
          <img src={onlylogo} alt="데브리" className="onlylogo"></img>
          <img src={logoType} alt="데브리" className="logotype"></img>
          <p className='logotext'>“개발과 관련된 모든 것들을 연결합니다.”</p>
        </div>
        <div className='login_warp'>
          <div className='login_content'>
            <div className='input_keyword'>ID</div>
            <div className='vertical_line'></div>
            <input className='id_input' type="email" placeholder="email 형식" onChange={e => {setEmail(e.target.value);}} />
          </div>
          <div className='login_content'>
            <div className='input_keyword'>PW</div>
            <div className='vertical_line'></div>
            <input className='pw_input' type="password" placeholder="비밀번호" onChange={e => {setPassword(e.target.value)}} />
            <img  className='capslock_icon' src={capsLockIcon} alt="" />
          </div>
          <div className="buttons_container">
            <button className='signup_button' onClick={goToAccount}>가입하기</button>
            <button className='login_button' onClick={goToMain}> 로그인 </button>
          </div>
        </div>
        <div className='copyright'>Copyright © 2022, Debri. All rights reserved.</div>
      </div>
    );
}
