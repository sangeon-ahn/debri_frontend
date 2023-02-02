import './Curris.css';
import curriIcon from '../../../assets/orbit.gif';
import latestCurriNavigator from '../../../assets/topCurriNavigatorIcon.png';
import { useNavigate } from 'react-router-dom';

export default function Curris(props) {
  const { curri } = props;
  const navigate = useNavigate();

  return (
    <div className='curri-container' onClick={() => navigate(`/curriculum/${curri.curriIdx}`)}>
        <div className='curri-img-box'>
          <img src={curriIcon} alt="" className='curri-icon'/>
        </div>
        <div className='curri-text-container'>
          <div className='curri-name'>{curri.curriName}</div>
          <div className='curri-desc'>{curri.curriDesc}</div>
          <div className='who-made-container'>
            <div className='by'>by</div>
            <div className='who-made'>{curri.curriAuthor}</div>
          </div>
        </div>
        <div className='curri-navigator' >
          <img src={latestCurriNavigator} alt="" />
        </div>
    </div>
  );
}
