import { useNavigate } from "react-router-dom";
import curriPlusIcon from "../../../assets/curriPlusIcon.png";

export default function BeginCurriButton() {
  const navigate = useNavigate();
  const handleStartCurriculumClick = () => {
    navigate('/home/beginCurri');
  };

  return (
    <>
      <button className="start-curriculum" onClick={handleStartCurriculumClick}>
        <img src={curriPlusIcon} alt="" className="start-curriculum-plus-icon"/>
        <div className="start-curriculum-text">새로운 커리큘럼 시작하기</div>
        <div className="start-curriculum-detail-text">“눌러서 새로운 강의를 찾아보기”</div>
      </button>
    </>
  )
}