import { useEffect } from 'react';
import roadmapCheckboxIcon from '../../../assets/roadmapCheckboxIcon.png';

export default function RoadmapChild(props) {
  const { curri } = props;

  return (
    <div className="roadmap-content-layer1">
      <div className="roadmap-content-layer2">
        <div className="roadmap-content">
          <div className="roadmap-content-title">{curri.childName}</div>
          <div className="roadmap-content-description">{curri.childExplain}</div>
        </div>
        <div className="roadmap-content-checkbox">
          <img src={roadmapCheckboxIcon} alt="" />
        </div>
      </div>
    </div>
  )
}