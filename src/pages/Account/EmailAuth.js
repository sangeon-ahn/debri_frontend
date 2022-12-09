import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import account_back from '../../assets/account_back.png';
import './Account.css';
import EmailFailModal from './EmailFailModal/EmailFailModal';

const EmailAuth =()=>{
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [clickButton, setClickButton] = useState(false);
  const [authEmail, setAuthEmail] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);
  const [minutes, setMinutes] = useState(parseInt(0));
  const [seconds, setSeconds] = useState(parseInt(0));
  const [emailFailModalOn, setEmailFailModalOn] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  function sendCode(event){
    event.preventDefault() 
    postData(email);
  }   

  async function postData(id) {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/authEmail`,
        JSON.stringify(
          {
            email : id
          }),
        { headers }
      );
      setAuthEmail(response.data.result)
      setMinutes(response.data.result.timeout/60000)
      setSeconds(response.data.result.timeout/1000%60)
      console.log('리턴', response.data.result);

    } catch (error) {
      console.error(error);
    }
  }
  const goToAccount = () => {
    setClickButton(true)
    if (code == authEmail.authNumber){
      console.log("인증코드 같음!")
      navigate("/account");
    } else{
      console.log("인증코드 다름!")
      setEmailFailModalOn(true);
      setIsSuccess(false)
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
            clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div className='account'>
      <div>
        <Link to="/" className='back_text'><img src={account_back} alt="back" className='back'></img></Link>
      </div>
      <div className='title'>
        <h1 style={{fontSize:'18px'}}>회원가입</h1>
        <p style={{fontSize:'14px'}}>이메일 인증</p>
      </div>

      <div className='account_warp'>
        <div className='account_items'>
          <div className='account_text'><span className={`text_bar ${!clickButton ? '' :( email ? 'success' : 'fail')}`}>이메일 (ID)</span></div>
          <div className= {`account_content ${!clickButton ? '' :( email ? 'success' : 'fail')}`}>
            <input className='textinput' type="email" placeholder="email 형식" onChange={e => {setEmail(e.target.value)}} value={email}/>
          </div>
        </div>
      </div>

      <div className="codebuttons_container">
        <button className='code_button' onClick={sendCode}> 인증코드 보내기 </button>
        <button className='again_code_button' onClick={sendCode}>코드 다시 받기</button>
      </div>

      <div className='code_warp'>
        <div className='code_items'>
          <div className='account_text'><span className={`text_bar ${!clickButton ? '' :( isSuccess ? '' : 'fail')}`}>인증코드</span></div>
          <div className= {`account_content ${!clickButton ? '' :( isSuccess ? '' : 'fail')}`}>
            <input className='textinput' type="text" placeholder="인증코드" onChange={e => {setCode(e.target.value)}} value={code}/>
          </div>
        </div>
        {authEmail &&
          <div>
            <span className='left_time'>만료까지 남은 시간 </span>
            <span className='timeout'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>
        }
      </div>

      <button className='auth_btn' onClick={goToAccount}>인증하기</button>
      <EmailFailModal
        isOpen={emailFailModalOn}
        onRequestClose={() => setEmailFailModalOn(false)}
      />
    </div>

  );
}
export default EmailAuth;