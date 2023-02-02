import { useNavigate } from 'react-router-dom';
import CurriIcon from '../../assets/orbit.gif';
import roadmapRightArrowIcon from '../../assets/roadmapRightArrowIcon.png';

export default function TopTenCurriculum(props) {
  const { curri } = props;
  const navigate = useNavigate();

  return (
    <div className="curriculum" onClick={() => navigate(`/curriculum/${curri.curriIdx}`)}>
      <div className="curriculum-Icon-box">
          <img src={CurriIcon} alt="" />
        </div>
        <div className="roadmap-detail-box">
          <div className="roadmap-title">{curri.curriName}</div>
          <div className="roadmap-description">{curri.curriDesc}</div>
          <div className="madeby">
            <div className="by">by</div>
            <div className="team-debri">{curri.curriAuthor}</div>
          </div>
        </div>
        <div className="roadmap-main-go-button-box">
          <img src={roadmapRightArrowIcon} alt="" />
        </div>
      </div>
  );
}