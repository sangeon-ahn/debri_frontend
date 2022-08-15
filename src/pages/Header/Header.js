import logo from '../../assets/LOGO.png';
import profile from '../../assets/Profile.png';
import human from '../../assets/human.png';
import './Header.css';

export default function Header() {
  const isFirstLogin = JSON.parse(localStorage.getItem("userData")).firstLogin;

  return (
    <>
      <div className="header">
        <img src={logo} alt="액박" className="logo" />
        {!isFirstLogin &&
          <>
            <img src={profile} alt="액박" className='profile' />
            <img src={human} alt="액박" className='human' />
          </>
        }
      </div>
    </>
  );
}