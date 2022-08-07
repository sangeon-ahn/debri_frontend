import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import onlylogo from '../../assets/ONLY_LOGO.png';
import logoType from '../../assets/LOGO_TYPE.png';
import arrow_back from '../../assets/arrow_back.png';
import Line_acc from '../../assets/Line_acc.png';
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
  const navigate = useNavigate();

  function onClickSave(event){
    event.preventDefault() 
    setLogin(true)
    if(Password !== PasswordCheck) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    } else if (!Id || !Password || !Nickname|| !Birth || !useCheck){
      console.log('fail')
    } else {
      postData(Id, Password, PasswordCheck, Birth, Nickname);
      navigate('/');
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
        <Link to="/" className='back_text'><img src={arrow_back} alt="back" className='back'></img>돌아가기</Link>
      </div>
      <div className= 'Logo_box'>
        <img src={onlylogo} alt="데브리" className="onlylogo"></img>
        <img src={logoType} alt="데브리" className="logotype"></img>
        <p className='logotext'>“개발과 관련된 모든 것들을 연결합니다.”</p>
      </div>

      <div className='account_warp'>
        <div className= {`account_content ${!login ? '' :( Id ? 'success' : 'fail')}`}>
          <div className='account_text'>ID</div>
          <img src={Line_acc} alt="데브리" style={{position:'absolute', margin: '7px 0px'}}></img>
          <input className='textinput' type="email" placeholder="email 형식" onChange={onChangeId} value={Id}/>
        </div>
        <div className= {`account_content ${!login ? '' :( Password ? 'success' : 'fail')}`}>
          <div className='account_text'>PW</div>
          <img src={Line_acc} alt="데브리" style={{position:'absolute', margin: '7px 0px'}}></img>
          <input className='textinput' type="password" placeholder="비밀번호" onChange={onChangePassword} value={Password}/>
        </div>
        <div className= {`account_content ${!login ? '' :( PasswordCheck ? 'success' : 'fail')}`}>
          <div className='account_text' style={{fontSize:'9px'}}>비밀번호 확인</div>
          <img src={Line_acc} alt="데브리"></img>
          <input className='textinput' type="password" placeholder="비밀번호 확인" onChange={onChangePasswordCheck} value={PasswordCheck} style={{position:'absolute', margin: '12px 5px'}}/>
        </div>
        <div className= {`account_content ${!login ? '' :( Birth ? 'success' : 'fail')}`}>
          <div className='account_text' style={{fontSize:'10px'}}>생년 월일</div>
          <img src={Line_acc} alt="데브리"></img>
          <input className='textinput' type="date" onChange={onChangeBirth} value={Birth} style={{position:'absolute', margin: '12px 5px'}}/>
        </div>
        <div className= {`account_content ${!login ? '' :( Nickname ? 'success' : 'fail')}`}>
          <div className='account_text' style={{fontSize:'10px'}}>닉네임</div>
          <img src={Line_acc} alt="데브리" style={{position:'absolute', margin: '7px 0px'}}></img>
          <input className='textinput' type="text" placeholder="닉네임" onChange={onChangeNickname} value={Nickname} />
        </div>
        <button className={`start_btn_acc ${!login ? '' :(useCheck ? 'success' : 'fail')}`} onClick={onClickSave}>시작하기</button>

        <form method="post" action="">
          <div>
            <div>
              <div className={`agree_btn ${!login ? '' :(useCheck ? 'success' : 'fail')}`}>
                <input className='textinput' type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent}/>
                <label for="all-check"><div className='agree_text'>전체 약관에 동의합니다.</div></label>
              </div>
              <div className={`agree_btn ${!login ? '' :(useCheck ? 'success' : 'fail')}`}>
                <input className='textinput' type="checkbox" id="check2" checked={useCheck}  onChange={useBtnEvent}/>
                <label for="check2"><div className='agree_text'>개인정보 약관에 동의합니다. (필수)</div></label>
              </div>
              <div className='agree_btn' style={{marginBottom:"100px"}}>
                <input className='textinput' type="checkbox" id="check3" checked={marketingCheck}  onChange={marketingBtnEvent}/>
                <label for="check3"><div className='agree_text'>서비스 홍보 약관에 동의합니다. (선택)</div></label>
              </div>
            </div>
          </div>
        </form>
        
      </div>
    </div>

  );
}
export default Account;