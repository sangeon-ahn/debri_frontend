import searchIcon from '../../assets/searchIcon.png';
import './Search.css';

export default function Search() {
  return (
    <>
      <div className="search-bar">
        <img src={searchIcon} alt="액박" className="search-icon" />
        <input type="text" className="search" placeholder="검색어를 입력하세요" />
      </div>
    </>
  )
}