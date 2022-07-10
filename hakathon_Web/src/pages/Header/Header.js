import {Link} from 'react-router-dom';
import "./Header.css";
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';

export default function Header() {
    // const userdata = JSON.parse(localStorage.getItem('userData'));
    const [user, setUser] = useRecoilState(userId);
    return (
        <div style={{width: "150px", float: "left"}}>
            <div className="headerStyle">
                Debri
            </div>
            <h5>유저 아이디 {user}번님 반갑습니다.</h5>
            <div>
                <div className='menuStyle'>
                    <Link to="/home" className='link'>홈</Link>
                </div>
                <div className='menuStyle'>
                    <Link to="/timetable" className='link'>시간표</Link>
                </div>
                <div className='menuStyle'>
                    <Link to="/search" className='link'>{"강의검색&추가"}</Link>
                </div>
                <div className='menuStyle'>
                    <Link to="/menu" className='link'>메뉴</Link>
                </div>
            </div>
        </div>
    );
}