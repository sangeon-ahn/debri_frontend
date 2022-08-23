import logo from '../../assets/LOGO.png';
import profile from '../../assets/Profile.png';
import human from '../../assets/human.png';
import './Header.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const isFirstLogin = JSON.parse(localStorage.getItem("userData")).firstLogin;

  return (
    <>
      <div className="header">
        <img src={logo} alt="액박" className="logo" onClick={()=>{navigate("/home")}}/>
        {!isFirstLogin &&
          <div onClick={()=>{navigate("/mypage")}}>
            <img src={profile} alt="액박" className='profile' />
            <img src={human} alt="액박" className='human' />
          </div>
        }
      </div>
    </>
  );
}