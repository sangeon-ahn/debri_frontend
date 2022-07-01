import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const users = [
  {
    email: "sangeon@gmail.com",
    password: "1234",
    nickname: "whale",
    curriculum: {
      subject: "front-end"
    }
  },
  {
    email: "tkddjs@gmail.com",
    password: 1234,
    nickname: "dolphin",
    curriculum: {
      subject: "back-end"
    }
  }
];

const Login = ()=>{
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
      console.log('hi');
      setPassword(e.target.value);
    }

    const handleIdChange = (e) => {
      setId(e.target.value);
    }

    const handleLoginButton = (e) => {
      const userData = users.filter(user => String(user.email) === String(id));

      if (userData[0].password !== password) {
        return;
      }

      localStorage.setItem('userData',JSON.stringify(userData));

      navigate('/home');
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