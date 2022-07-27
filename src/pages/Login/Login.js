import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import clayful from 'clayful/client-js';
import axios from 'axios';
import onlylogo from '../../assets/ONLY_LOGO.png';
import logoType from '../../assets/LOGO_TYPE.png';
// import './login.css';


// 초기값 공백 지정 useState
const Login =()=> {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState("");
  // const [userId, setUserId] = useState([]);
  // const [email, setEmail] = useState("");


// 로그인 버튼 활성화 (조건 지정) ==> type 이 email 인데 괜찮나...
  const [button, setButton] = useState(true);

  function changeButton() {
    id.includes('@') && pw.length >= 5 ? setButton(false) : setButton(true);
  }

  // 페이지 이동 (가입하기와 로그인 누를 때) ==> main 페이지 아직 안만들어짐
  // function login() {
  //   const navigate = useNavigate();
  
    const goToAccount = () => {
      navigate("/");
    };

    const goToMain = () => {
        if(response.message === "valid user"){             // 조건식 지정 더 알아보기
          // navigate('/main');
        } else {
          alert("가입된 회원이 아닙니다. 회원가입을 먼저 해주세요.")
          navigate('/');
        }
      }
  
// 임의의 판정 데이터
  const realId = "kiki@naver.com";
  const realPw = "12345678";

  // 로그인 api 연동부분 --> 으아아 핵심
  // const headers = {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // };

  // async function postData(id,password) {
  //   try {
  //     const response = await axios.post(`/api/auth/login`,
  //       JSON.stringify(
  //         {
  //           id : 'id',
  //           password : 'password'
  //         }),
  //       { headers });
  //     console.log('리턴', response);
  //     alert('저장완료');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

// JSX 화면구성
    return (
      <div className='login'>
        <div className='Logo_box'>
          <img src={onlylogo} alt="데브리" className="onlylogo"></img>
          <img src={logoType} alt="데브리" className="logotype"></img>
          <p className='logotext'>“개발과 관련된 모든 것들을 연결합니다.”</p>
        </div>
        <div className='login_warp'>
          {/* 사용자 입력 데이터 저장 */}
          <div className='login_content'>
            ID <input type="email" placeholder="email 형식" onChange={e => {setId(e.target.value);}} onKeyUp={changeButton} />
          </div>
          <div className='login_content'>
            PW <input type="password" placeholder="비밀번호" onChange={e => {setPassword(e.target.value);}} onKeyUp={changeButton} />
          </div>
          <div className="loginButton">
            <button onClick={goToMain} disabled={button} onClick={e => {
              if (realId == id) {
                if (realPw == pw) {
                  e.stopPropagation();
                  goToMain();
                }
              } else {
                alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
              }}}> 로그인 </button>   {/* css 연동 시에 className 조정 필요 --> 두개 나눠서 할지도 결정, disabled 속성 이용 가능 */}

            <button onClick={goToAccount}>가입하기</button>
          </div>
          <p className='logotext'>Copyright © 2022, Debri. All rights reserved.</p>
    );
} 
export default Login;