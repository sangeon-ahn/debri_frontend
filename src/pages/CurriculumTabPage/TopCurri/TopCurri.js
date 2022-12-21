import './TopCurri.css';
import curriIcon from '../../../assets/orbit.gif';
import topCurriNavigator from '../../../assets/topCurriNavigatorIcon.png';
import crown1 from '../../../assets/crown1.png';
import crown2 from '../../../assets/crown2.png';
import crown3 from '../../../assets/crown3.png';
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
    } else{
      return 'ranking black'
    }
  };
  const setCrown = (culum) => {
    if (culum.ranking === 1) {
      return crown1;
    } else if (culum.ranking === 2) {
      return crown2;
    } else if (culum.ranking === 3) {
      return crown3;
    }
  };

  return (
    <div className='top-curri-container'>
      <div className={setRankingColor(curri)}><img src={setCrown(curri)} className='crown-icon'/>{curri.ranking}</div>
      <div className='top-curri-desc' onClick={() => navigate(`/curriculum/${curri.curriIdx}`)}>
        <div className='curri-img-box'>
          <img src={curriIcon} alt="" className='curri-icon'/>
        </div>
        <div className='top-curri-text-container'>
          <div className='top-curri-name'>{curri.curriName}</div>
          <div className='top-curri-desc'>Basic Tools에 대한 이해</div> 
          <div className='who-made-container'>
            <div className='by'>by</div>
            <div className='who-made'>{curri.curriAuthor}</div>
          </div>
        </div>
      </div>
        <div className='top-curri-navigator'>
          <img src={topCurriNavigator} alt="" />
        </div>
    </div>
  );
}