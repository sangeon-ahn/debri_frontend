import './LectureSearch.css';
import searchIcon from '../../../assets/searchIcon.png';

export default function LectureSearch(props) {
  const { setSearchInput } = props;

  return (
    <>
      <div className="lecture-search-bar">
        <img src={searchIcon} alt="액박" className="lecture-search-icon" />
        <input
          type="text"
          className="lecture-search"
          placeholder="검색어를 입력하세요"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </>
  )
}