import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import account_back from '../../assets/account_back.png';
import './Account.css';

// api 완성 안 됨!!!!!!
const EmailAuth =()=>{
  const navigate = useNavigate();
  const [userId, setUserId] = useState([]); 
  const [Id, setId] = useState('');
  const [login, setLogin] = useState(false);

  function sendCode(event){
    event.preventDefault() 
    postData(Id);
  }   

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  async function postData(id) {
    try {
      const response = await axios.post(`/api/auth/authEmail`,
        JSON.stringify(
          {
            email : id
          }),
        { headers }
      );
      console.log('리턴', response);

    } catch (error) {
      console.error(error);
    }
  }

  const onChangeId = (e) => {
    setId(e.target.value)
  }

  const goToAccount = () => {
    navigate("/account");
  };

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
          <div className='account_text'><span className={`text_bar ${!login ? '' :( Id ? 'success' : 'fail')}`}>이메일 (ID)</span></div>
          <div className= {`account_content ${!login ? '' :( Id ? 'success' : 'fail')}`}>
            <input className='textinput' type="email" placeholder="email 형식" onChange={onChangeId} value={Id}/>
          </div>
        </div>
      </div>

      <div className="codebuttons_container">
        <button className='code_button' onClick={sendCode}> 인증코드 보내기 </button>
        <button className='again_code_button'>코드 다시 받기</button>
      </div>

      <div className='code_warp'>
        <div className='code_items'>
          <div className='account_text'><span className={`text_bar ${!login ? '' :( Id ? '' : 'fail')}`}>인증코드</span></div>
          <div className= {`account_content ${!login ? '' :( Id ? 'success' : 'fail')}`}>
            <input className='textinput' type="email" placeholder="인증코드" onChange={onChangeId} value={Id}/>
          </div>
        </div>
        <div>만료까지 남은 시간 00:30</div>
      </div>

      <button className='auth_btn' onClick={goToAccount} >인증하기</button>
    </div>

  );
}
export default EmailAuth;