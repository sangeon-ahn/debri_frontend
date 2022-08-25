import './LatestCurri.css';
import curriIcon from '../../../assets/orbit.gif';
import latestCurriNavigator from '../../../assets/topCurriNavigatorIcon.png';
import { useNavigate } from 'react-router-dom';

export default function LatestCurri(props) {
  const { curri } = props;
  const navigate = useNavigate();

  return (
    <div className='latest-curri-container' onClick={() => navigate(`/curriculum/${curri.curriIdx}`)}>
        <div className='curri-img-box'>
          <img src={curriIcon} alt="" className='curri-icon'/>
        </div>
        <div className='latest-curri-text-container'>
          <div className='latest-curri-name'>{curri.curriName}</div>
          <div className='latest-curri-desc'>{curri.curriDesc}</div>
          <div className='who-made-container'>
            <div className='by'>by</div>
            <div className='who-made'>{curri.curriAuthor}</div>
          </div>
        </div>
        <div className='latest-curri-navigator' >
          <img src={latestCurriNavigator} alt="" />
        </div>
    </div>
  );
}
