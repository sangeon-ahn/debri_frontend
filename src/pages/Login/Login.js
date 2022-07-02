import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ()=>{
    const [Password, setPassword] = useState('');
    const [Id, setId] = useState('');
    const navigate = useNavigate();


    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

  
    async function postData(id,password) {
      console.log(id, password)
      try {
        const response = await axios.post(`/user/login`,
          JSON.stringify({id,password}),
          { headers }
        );
        console.log('리턴', response);
        alert('저장완료');
  
      } catch (error) {
        console.error(error);
      }
    }

    const handleIdChange = (e) => {
      setId(e.target.value);
    }

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }

    const handleLoginButton = (e) => {
      e.preventDefault() 
      postData(Id,Password)
    };

    

    return(
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
        <button
          type="button"
          onClick={handleLoginButton}
        >
          로그인
        </button>
      </div>
    );
}
export default Login;