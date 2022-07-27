import Header from "../Header/Header";
import './LecturePage.css';
import Search from "../Search/Search";
import filterIcon from "../../assets/filterIcon.png";
import keywordPlusIcon from '../../assets/keywordPlusIcon.png';

export default function LecturePage() {
  return (
    <>
      <Header />
      <div className="lecture-page-container">
        <div className="lecture-list-text-container">
          <div className="lecture-list-text">강의 리스트</div>
          <div className="filter-icon-box">
            <img src={filterIcon} alt="" />
          </div>
        </div>
        <Search />
        <div className="keywords-container">
          <div className="keywords-subject-container">
            <div className="keyword">
              <div>Front</div>
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              <div>Front</div>
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              <div>Front</div>
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              <div>Front</div>
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
          </div>
          <div className="keywords-subject-container">
            <div className="keyword">
              Front
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              Front
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
          </div>
          <div>
            <div className="keyword">
              Front
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              Front
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}