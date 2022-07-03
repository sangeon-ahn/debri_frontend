import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Account =()=>{
  const [userId, setUserId] = useState([]); 
  const [Id, setId] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordCheck, setPasswordCheck] = useState('');
  const [Birth, setBirth] = useState('');
  const [Nickname, setNickname] = useState('');
  const [isagree, setIsagree] = useState('false');

  function onClickSave(event){
    event.preventDefault() 
    if(Password !== PasswordCheck) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    }
    console.log(typeof(Birth))
    console.log(Id, Password, Birth, Nickname);
    postData(Id, Password, Birth, Nickname);
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

  return (
    <div>
      <div>
        <div>
          아이디 <input type="email" placeholder="email 형식" onChange={onChangeId} value={Id}/>
        </div>
        <div>
          비밀번호 <input type="password" placeholder="비밀번호" onChange={onChangePassword} value={Password} />
        </div>
        <div>
          비밀번호 확인 <input type="password" placeholder="비밀번호 확인" onChange={onChangePasswordCheck} value={PasswordCheck} />
        </div>
        <div>
          생년월일 <input type="date" onChange={onChangeBirth} value={Birth}/>
        </div>
        <div>
          닉네임 <input type="text" placeholder="닉네임" onChange={onChangeNickname} value={Nickname} />
        </div>

      </div>
      <button onClick={onClickSave}>가입하기</button>
      <button><Link to="/">로그인</Link></button>
    </div>

  );
}
export default Account;