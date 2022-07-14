import logo from '../../assets/LOGO.png';
import profile from '../../assets/Profile.png';
import human from '../../assets/human.png';
import './Header.css';

export default function Header() {
  return (
    <>
      <div className="header">
        <img src={logo} alt="액박" className="logo"></img>
        <img src={profile} alt="액박" className='profile'></img>
        <img src={human} alt="액박" className='human'></img>
      </div>
    </>
  );
}