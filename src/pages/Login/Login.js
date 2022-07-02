import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => {
    //   navigate('/home');
    // }, [isSuccess]);

    const handlePasswordChange = (e) => {
      console.log('hi');
      setPassword(e.target.value);
    }

    const handleIdChange = (e) => {
      setId(e.target.value);
    }

    const handleLoginButton = (e) => {
      const fetchUser = async (email, pw) => {
        try {
          setError(null);
          setUser(null);
          setLoading(true);
          
          const response = await axios.post(
            'http://54.180.180.217/user/login',
            {
              id: email,
              password:pw
            }
          );

          setUser(response.data);
          setIsSuccess(response.data.isSuccess);
          navigate('/home');
        } catch (error) {
          setError(error);
        }
        setLoading(false);
      }
      fetchUser(id, password);

      // localStorage.setItem('userIndex', user.result.userIdx);

    };

    return (
      <div>
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
          <Link to='/timetable'>시간표</Link>
        </div>
        <div className="toggle">
          
        </div>
      </div>
    );
}

export default Login;
