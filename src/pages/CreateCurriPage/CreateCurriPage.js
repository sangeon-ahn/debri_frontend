import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './CreateCurriPage.css';
import backNaviIcon from '../../assets/backNaviIcon.png';
import blurredGreenCircleIcon from '../../assets/blurredGreenCircleIcon.png';
import plusIcon from '../../assets/plusIcon.png';
import minusIcon from '../../assets/minusIcon.png';
import publicIcon from '../../assets/publicIcon.png';
import defaultPrivateIcon from '../../assets/defaultEyeIcon.png';
import privateIcon from '../../assets/privateIcon.png';
import defaultPublicIcon from '../../assets/defaultPublicIcon.png';

export default function CreateCurriPage() {
  const [curriName, setCurriName] = useState('');
  const [visibleStatus, setVisibleStatus] = useState(null);
  const [curriDesc, setCurriDesc] = useState('');
  const [result , setResult] = useState(null);
  const [subject, setSubject] = useState(null);
  const curriAuthor = JSON.parse(localStorage.getItem("userData")).userName;
  const navigate = useNavigate();

  const handleCurriName = (e) => {
    setCurriName(e.target.value);
  }

  const handleCurriDesc = (e) => {
    setCurriDesc(e.target.value);
  };

  const handleSubjectClick = (sub) => {
    setSubject(sub);
  }

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const postCreateCurri = async (curriName, curriAuthor, visibleStatus, langTag, curriDesc) => {
    try {
      const response = await axios.post('/api/curri/create',
        JSON.stringify({
          curriName: curriName,
          curriAuthor: curriAuthor,
          visibleStatus: visibleStatus,
          langTag: langTag,
          curriDesc: curriDesc
        }),
        { headers }
      );
      console.log(response);
      setResult(response.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateCurriButton = (e) => {
    if (curriName === '' || curriDesc === '' || subject === null || visibleStatus === null) return;

    postCreateCurri(curriName, curriAuthor, visibleStatus, subject, curriDesc);
  };

  useEffect(() => {
    if (result !== null) {
      console.log('결과', result);
      navigate('/home');
    }
  }, [result]);
  console.log(curriName, curriAuthor, visibleStatus, subject, curriDesc);
  return (
    <>
      <Header />
      <div className='create-curri-page-top'>
        <div className='back-navi-box' onClick={() => navigate(-1)}>
          <img src={backNaviIcon} alt="" />
        </div>
        <div className='create-curri-page-text'>
          <div className='setting-curri-text'>커리큘럼 설정하기</div>
          <div className='setting-curri-desc'>시작하기 전에 세부사항을 설정해주세요.</div>
        </div>
      </div>
      <div className='create-curri-main'>
        <div className='curri-name-container'>
          <div className='curri-name-text'>커리큘럼 이름</div>
          <div className='curri-name-input-box'>
            <input type='text' value={curriName} onChange={handleCurriName} className='curri-name-input' placeholder='이름을 입력해 주세요' spellCheck={false} />
          </div>
        </div>
        <div className='curri-desc-container'>
          <div className='curri-desc-text'>커리큘럼 설명</div>
          <div className='curri-desc-input-box'>
            <input type='text' value={curriDesc} onChange={handleCurriDesc} className='curri-name-input' placeholder='설명을 입력해 주세요' spellCheck={false} />
          </div>
        </div>
        <div className='curri-detail-setting'>
          <div className='curri-categorys'>
            <div className='curri-categorys-text'>카테고리 분류</div>
            <div className="keywords-subject-container">
            <button className={subject === 'Front' ? 'cate-red cate-keyword' : 'cate-keyword'} onClick={() => handleSubjectClick('Front')}>
            <div className='filter-text'>Front</div>
            {subject === 'Front' ?
              <div className='filter-minus-box'>
                <img className="minus-icon" src={minusIcon} alt="" onClick={() => handleSubjectClick('Front')}/> 
              </div> :
              <div className='filter-plus-box'>
                <img className="keyword-plus-icon" src={plusIcon} alt="" onClick={() => handleSubjectClick('Front')}/>
              </div>
            }
            </button>
            <button className={subject === 'Back' ? 'cate-keyword cate-green' : 'cate-keyword'} onClick={() => handleSubjectClick('Back')}>
                <div>Back</div>
                {subject === 'Back' ?
                  <img className="minus-icon" src={minusIcon} alt="" onClick={() => handleSubjectClick('Back')}/> :
                  <img className="keyword-plus-icon" src={plusIcon} alt=""  onClick={() => handleSubjectClick('Back')}/>}
              </button>
              <button className={subject === 'Python' ? 'cate-keyword cate-blue': 'cate-keyword'} onClick={() => handleSubjectClick("Python")}>
                <div>Python</div>
                {subject === 'Python' ?
                  <img className="minus-icon" src={minusIcon} alt="" onClick={() => handleSubjectClick("Python")}/> :
                  <img className="keyword-plus-icon" src={plusIcon} alt="" onClick={() => handleSubjectClick("Python")}/>}
              </button>
            <button className={subject === 'C 언어' ? 'cate-keyword cate-gray': 'cate-keyword'} onClick={() => handleSubjectClick('C 언어')}>
                <div>C 언어</div>
                {subject === 'C 언어' ?
                  <img className="minus-icon" src={minusIcon} alt="" onClick={() => handleSubjectClick('C 언어')} /> :
                  <img className="keyword-plus-icon" src={plusIcon} alt="" onClick={() => handleSubjectClick('C 언어')} />}
              </button>
          </div>
          </div>
          <div className='publicity-choice'>
            <div className='publicity-choice-text'>공개 여부</div>
            {visibleStatus === 'ACTIVE' ?
              <div className='public-choice' onClick={() => setVisibleStatus('ACTIVE')}>
                <div className='public-icon-box'>
                  <img src={publicIcon} alt="" />
                </div>
                <div className='public-choice-text'>공개</div>
              </div> :
              <div className='default-public-choice' onClick={() => setVisibleStatus('ACTIVE')}>
                <div className='default-public-icon-box'>
                  <img src={defaultPublicIcon} alt="" />
                </div>
                <div className='default-choice-text'>공개</div>
              </div>
          }
          <div className='publicity-check-horizontal-line'></div>
          {visibleStatus === 'INACTIVE' ?
              <div className='private-choice' onClick={() => setVisibleStatus('INACTIVE')}>
                <div className='private-icon-box'>
                  <img src={privateIcon} alt="" />
                </div>
                <div className='private-choice-text'>비공개</div>
              </div> :
              <div className='default-choice' onClick={() => setVisibleStatus('INACTIVE')}>
              <div className='default-icon-box'>
                <img src={defaultPrivateIcon} alt="" />
              </div>
              <div className='default-choice-text'>비공개</div>
            </div>
          }
            <div className='publicity-desc'>내 커리큘럼을 공개로 설정할 경우, 다른 유저들이 내 커리큘럼의 도움을 받을 수 있어요</div>
          </div>
        </div>
      </div>
      <div className='background-image-box'>
        <img src={blurredGreenCircleIcon} alt="" />
      </div>
      <div className='curri-create-button' onClick={handleCreateCurriButton}>
        시작하기
      </div>
    </>
  )
}