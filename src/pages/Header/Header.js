import {Link} from 'react-router-dom';
import "./Header.css";

export default function Header() {
    // const userdata = JSON.parse(localStorage.getItem('userData'));

    return (
        <div style={{width: "150px", float: "left"}}>
            <div className="headerStyle">
                Debri
            </div>
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
            {/* <div>
                <br />
                {userdata[0].email}<br />
                {userdata[0].nickname}
            </div> */}
        </div>
    );
}