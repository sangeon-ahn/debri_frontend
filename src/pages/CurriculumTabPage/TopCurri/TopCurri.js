import './TopCurri.css';
import curriIcon from '../../../assets/orbit.gif';
import topCurriNavigator from '../../../assets/topCurriNavigatorIcon.png';
import { useNavigate } from 'react-router-dom';

export default function TopCurri(props) {
  const { curri } = props;
  const navigate = useNavigate();

  const setRankingColor = (culum) => {
    if (culum.ranking === 1) {
      return 'ranking yellow';
    } else if (culum.ranking === 2) {
      return 'ranking whitegray';
    } else if (culum.ranking === 3) {
      return 'ranking orange';
    }
    else{
      return 'ranking black'
    }
  };

  return (
    <div className='top-curri-container'>
      <div className={setRankingColor(curri)}>{curri.ranking}</div>
      <div className='top-curri-desc' onClick={() => navigate(`/curriculum/${curri.curriIdx}`)}>
        <div className='curri-img-box'>
          <img src={curriIcon} alt="" className='curri-icon'/>
        </div>
        <div className='top-curri-text-container'>
          <div className='top-curri-name'>{curri.curriName}</div>
          <div className='top-curri-desc'>Basic Tools에 대한 이해</div>
        </div>
      </div>
        <div className='top-curri-navigator'>
          <img src={topCurriNavigator} alt="" />
        </div>
    </div>
  );
}