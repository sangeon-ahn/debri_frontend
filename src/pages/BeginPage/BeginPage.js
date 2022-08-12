import LowBar from "../LowBar/LowBar";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./BeginPage.css";
import curriPlusIcon from "../../assets/curriPlusIcon.png";

export default function BeginPage() {

  return (
    <>
      <Header />
      <div className="start-curriculum">
        <img src={curriPlusIcon} alt="" className="start-curriculum-plus-icon"/>
        <div className="start-curriculum-text">새로운 커리큘럼 시작하기</div>
        <div className="start-curriculum-detail-text">“눌러서 새로운 강의를 찾아보기”</div>
      </div>
    </>
  );
}