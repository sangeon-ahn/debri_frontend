import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import onlylogo from '../../assets/ONLY_LOGO.png';
import logoType from '../../assets/LOGO_TYPE.png';
import './LoginPage.css';
import capsLockIcon from '../../assets/capsLockIcon.png';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { lowbarSelect } from '../../Atom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const navigate = useNavigate();
  const idRef = useRef();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [lowbar, setLowbar] = useRecoilState(lowbarSelect);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };



  async function postData(email, pwd) {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`,
        JSON.stringify(
          {
            email : email,
            pwd : pwd
          }),
        { headers });
      console.log('리턴', response);
      if (response.data.isSuccess) {
        localStorage.setItem("userData", JSON.stringify(response.data.result));
        localStorage.setItem("idPassword", JSON.stringify({id: email, pwd: pwd}));
        navigate('/home');
        setLowbar({
          homeButton: true,
          lectureButton: false,
          boardButton: false,
          curriButton: false
        });
      } else {
        setIsLoginFailed(true);
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

    const detectEnterInput = e => {
      if (e.key === 'Enter') {
        goToMain();
      }
    };

    
    useEffect(() => {
      if (localStorage.getItem("idPassword")) {
        console.log('hi');
        const { id, pwd } =  JSON.parse(localStorage.getItem('idPassword'));
        console.log(id, pwd);
        setEmail(id);
        setPassword(pwd);
      }
    }, [])

    return (
        <div className='login'>
          <div className='Logo_box'>
            <img src={onlylogo} alt="데브리" className="onlylogo"></img>
            <img src={logoType} alt="데브리" className="logotype"></img>
            <p className='logotext'>“개발과 관련된 모든 것들을 연결합니다.”</p>
          </div>
          <div className='login_warp'>
            <div className={isLoginFailed ? 'login_content login_content_failed' : 'login_content'}>
              <div className={isLoginFailed ? 'input_keyword input_keyword_failed' : 'input_keyword'}>ID</div>
              <div className={isLoginFailed ? 'vertical_line vertical_line_failed' : 'vertical_line'}></div>
              <input ref={idRef} className='id_input' placeholder="email 형식" type="email" value={email} onChange={e => {setEmail(e.target.value)}} />
            </div>
            <div className={isLoginFailed ? 'login_content login_content_failed' : 'login_content'}>
              <div className={isLoginFailed ? 'input_keyword input_keyword_failed' : 'input_keyword'}>PW</div>
              <div className={isLoginFailed ? 'vertical_line vertical_line_failed' : 'vertical_line'}></div>
              <input className='pw_input' placeholder="비밀번호" type="password" value={password} onChange={e => {setPassword(e.target.value)}} onKeyDown={detectEnterInput} />
              <img  className='capslock_icon' src={capsLockIcon} alt="" />
            </div>
            <div className="buttons_container">
              <button className='signup_button' onClick={goToAccount}>가입하기</button>
              <button className='login_button' onClick={goToMain}> 로그인 </button>
            </div>
          </div>
          <div className='copyright'>Copyright © 2022, Debri. All rights reserved.</div>
          <div style={{position:"fixed", zIndex: 1, width: '360px', height: '100px', backgroundColor: '#0A1123', bottom: '10px'}} ></div>
        </div>
    );
}
