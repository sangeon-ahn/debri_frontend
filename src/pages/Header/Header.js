import {Link} from 'react-router-dom';
import "./Header.css";

export default function Header() {
    return (
        <div>
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
        </div>
    );
}