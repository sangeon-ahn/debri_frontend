import logo from '../../assets/LOGO.png';
import profile from '../../assets/Profile.png';
import human from '../../assets/human.png';
import './Header.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { lowbarSelect } from '../../Atom';

export default function Header() {
  const navigate = useNavigate();
  const isFirstLogin = JSON.parse(localStorage.getItem("userData")).firstLogin;
  const [lowbar, setLowbar] = useRecoilState(lowbarSelect);

  return (
    <>
      <div className="header">

      </div>
    </>
  );
}