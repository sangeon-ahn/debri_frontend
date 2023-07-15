import './Roadmap.css';
import roadmapIcon from '../../../assets/orbit.gif';
import roadmapRightArrowIcon from '../../../assets/roadmapRightArrowIcon.png';
import { useNavigate } from 'react-router-dom';

export default function Roadmap(props) {
  const navigate = useNavigate();
  const { roadmap } = props;
  return (
    <div className="roadmap">
      <div className="roadmap-icon-box">
        <img src={roadmapIcon} alt="" />
      </div>
      <div className="roadmap-navi-container" onClick={() => navigate(`/roadmaps?field=${roadmap.mod}`)}>
        <div className="roadmap-detail-box">
          <div className="roadmap-title">{roadmap.roadmapName}</div>
          <div className="roadmap-description">{roadmap.roadmapExplain}</div>
          <div className="madeby">
            <div className="by">by</div>
            <div className="team-debri">{roadmap.roadmapAuthor}</div>
          </div>
        </div>
        <div className="roadmap-main-go-button-box">
          <img src={roadmapRightArrowIcon} alt="" />
        </div>
      </div>
    </div>
  );
}