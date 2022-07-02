import {Link} from 'react-router-dom';
import "./Header.css";

export default function Header() {
    // const userdata = JSON.parse(localStorage.getItem('userData'));

    return (
        <div style={{width: "100px", float: "left"}}>
            <div className="headerStyle">
                Debri
            </div>
            <div>
                <div className='menuStyle'>
                    <Link to="/home">홈</Link>
                </div>
                <div className='menuStyle'>
                    <Link to="/timeline">시간표</Link>
                </div>
                <div className='menuStyle'>
                    <Link to="/search">강의검색</Link>
                </div>
                <div className='menuStyle'>
                    <Link to="/menu">메뉴</Link>
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