import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import onlylogo from '../../assets/ONLY_LOGO.png';
import logoType from '../../assets/LOGO_TYPE.png';
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

  function onClickSave(event){
    event.preventDefault() 
    if(Password !== PasswordCheck) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    } else if (!Id || !Password || !Nickname|| !Birth || !useCheck){
      alert("필수항목을 확인해주세요")
    } else {
      // postData(Id, Password, Birth, Nickname);
    }
    console.log(typeof(Birth))
    console.log(Id, Password, Birth, Nickname);
  }     

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  async function postData(id,password,birthday, nickname) {
    try {
      const response = await axios.post(`/api/user/create`,
        JSON.stringify(
          {
            id : id, 
            nickname : nickname,
            birthday: birthday,
            password : password
          }),
        { headers }
      );
      console.log('리턴', response);
      alert('저장완료');

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
      <button><Link to="/">돌아가기</Link></button>
      <div className='Logo_box'>
        <img src={onlylogo} alt="데브리" className="onlylogo"></img>
        <img src={logoType} alt="데브리" className="logotype"></img>
        <p className='logotext'>“개발과 관련된 모든 것들을 연결합니다.”</p>
      </div>

      <div className='account_warp'>
        <div className='account_content'>
          ID <input type="email" placeholder="email 형식" onChange={onChangeId} value={Id}/>
        </div>
        <div className='account_content'>
          PW <input type="password" placeholder="비밀번호" onChange={onChangePassword} value={Password} />
        </div>
        <div className='account_content'>
          비밀번호<br></br>확인 <input type="password" placeholder="비밀번호 확인" onChange={onChangePasswordCheck} value={PasswordCheck} />
        </div>
        <div className='account_content'>
          생년<br></br>월일 <input type="date" onChange={onChangeBirth} value={Birth}/>
        </div>
        <div className='account_content'>
          닉네임 <input type="text" placeholder="닉네임" onChange={onChangeNickname} value={Nickname} />
        </div>
        <button onClick={onClickSave}>시작하기</button>

        <form method="post" action="">
          <div>
            <div>
              <div>
                <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent}/>
                <label for="all-check">전체 약관에 동의합니다.</label>
              </div>
              <div>
                <input type="checkbox" id="check2" checked={useCheck}  onChange={useBtnEvent}/>
                <label for="check2">개인정보 약관에 동의합니다. (필수)</label>
              </div>
              <div>
                <input type="checkbox" id="check3" checked={marketingCheck}  onChange={marketingBtnEvent}/>
                <label for="check3">서비스 홍보 약관에 동의합니다. (선택)</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}
export default Account;