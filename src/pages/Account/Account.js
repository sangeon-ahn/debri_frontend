import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import account_back from '../../assets/account_back.png';
import './Account.css';

const Account =()=>{
  const [userId, setUserId] = useState([]); 
  const [Id, setId] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordCheck, setPasswordCheck] = useState('');
  const [Birth, setBirth] = useState('');
  const [Nickname, setNickname] = useState('');
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [login, setLogin] = useState(false);

  function onClickSave(event){
    event.preventDefault() 
    setLogin(true)
    if(Password !== PasswordCheck) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    } else if (!Id || !Password || !Nickname|| !Birth || !useCheck){
      console.log('fail')
    } else {
      postData(Id, Password, PasswordCheck, Birth, Nickname);
    }
    console.log(Id, Password, PasswordCheck, Birth, Nickname);
  }     

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  async function postData(id,password, passwordCheck, birthday, nickname) {
    try {
      const response = await axios.post(`/api/user/signUp`,
        JSON.stringify(
          {
            userId : id,
            password : password,
            password2 : passwordCheck,
            nickname : nickname,
            birthday: birthday
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
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value)
  }
  const onChangeBirth = (e) => {
    setBirth(e.target.value)
  }
  const onChangeNickname = (e) => {
    setNickname(e.target.value)
  }

  const allBtnEvent =()=>{
    if(allCheck === false) {
      setAllCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    }else {
      setAllCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    } 
  };  
  const useBtnEvent =()=>{
    if(useCheck === false) {
      setUseCheck(true)
    }else {
      setUseCheck(false)
    }
  };  
  const marketingBtnEvent =()=>{
    if(marketingCheck === false) {
      setMarketingCheck(true)
    }else {
      setMarketingCheck(false)
    }
  };

  useEffect(()=>{
    if(useCheck===true && marketingCheck===true){
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }, [useCheck, marketingCheck])

  return (
    <div className='account'>
      <div>
        <Link to="/emailAuth" className='back_text'><img src={account_back} alt="back" className='back'></img></Link>
      </div>
      <div className='title'>
        <h1 style={{fontSize:'18px'}}>회원가입</h1>
        <p style={{fontSize:'14px'}}>정보입력</p>
      </div>

      <div className='account_warp'>
        <div className='account_items'>
          <div className='account_text'><span className={`text_bar ${!login ? '' :( Id ? 'success' : 'fail')}`}>이메일 (ID)</span></div>
          <div className= {`account_content ${!login ? '' :( Id ? 'success' : 'fail')}`}>
            <input className='textinput' type="email" placeholder="email 형식" onChange={onChangeId} value={Id}/>
          </div>
        </div>
        <div className='account_items'>
          <div className='account_text'><span className={`text_bar ${!login ? '' :( Password ? 'success' : 'fail')}`}>비밀번호</span></div>
          <div className= {`account_content ${!login ? '' :( Password ? 'success' : 'fail')}`}>
            <input className='textinput' type="password" placeholder="비밀번호" onChange={onChangePassword} value={Password} />
          </div>
        </div>
        <div className='account_items'>
          <div className='account_text'><span className={`text_bar ${!login ? '' :( PasswordCheck ? 'success' : 'fail')}`}>비밀번호확인</span></div>
          <div className= {`account_content ${!login ? '' :( PasswordCheck ? 'success' : 'fail')}`}>
            <input className='textinput' type="password" placeholder="비밀번호 확인" onChange={onChangePasswordCheck} value={PasswordCheck} />
          </div>
        </div>
        <div className='account_items'>
          <div className='account_text'><span className={`text_bar ${!login ? '' :( Birth ? 'success' : 'fail')}`}>생년월일</span></div>
          <div className= {`account_content ${!login ? '' :( Birth ? 'success' : 'fail')}`}>
            <input className='textinput' type="date" onChange={onChangeBirth} value={Birth}/>
          </div>
        </div>
        <div className='account_items'>
          <div className='account_text'><span className={`text_bar ${!login ? '' :( Nickname ? 'success' : 'fail')}`}>닉네임</span></div>
          <div className= {`account_content ${!login ? '' :( Nickname ? 'success' : 'fail')}`}>
            <input className='textinput' type="text" placeholder="닉네임" onChange={onChangeNickname} value={Nickname} />
          </div>
        </div>

        <form method="post" action="">
          <div>
            <div className={`agree_all_btn ${!login ? '' :(useCheck ? 'success' : 'fail')}`}>
              <input className='textinput' type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent}/>
              <label for="all-check"><div className='agree_all_text'>전체 약관에 동의합니다.</div></label>
              <div className={`agree_btn ${!login ? '' :(useCheck ? 'success' : 'fail')}`}>
                <input className='textinput' type="checkbox" id="check2" checked={useCheck}  onChange={useBtnEvent}/>
                <label for="check2"><div className='agree_text'>개인정보 약관에 동의합니다. (필수)</div></label>
              </div>
              <div className={`agree_btn ${!login ? '' :(useCheck ? 'success' : 'fail')}`}>
                <input className='textinput' type="checkbox" id="check3" checked={marketingCheck}  onChange={marketingBtnEvent}/>
                <label for="check3"><div className='agree_text'>서비스 홍보 약관에 동의합니다. (선택)</div></label>
              </div>
            </div>
          </div>
        </form>
        
        <button className={`start_btn ${!login ? '' :(Id&&Password&&PasswordCheck&&Birth&&Nickname&&useCheck ? 'success' : 'fail')}`} onClick={onClickSave}>시작하기</button>

      </div>
    </div>

  );
}
export default Account;