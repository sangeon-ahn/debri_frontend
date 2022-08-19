import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './CreateCurriPage.css';

export default function CreateCurriPage() {
  const [curriName, setCurriName] = useState('');
  const [visibleStatus, setVisibleStatus] = useState("ACTIVE");
  const [langTag, setLangTag] = useState("BACK");
  const curriAuthor = JSON.parse(localStorage.getItem("userData")).userName;
  const navigate = useNavigate();

  const handleCurriName = (e) => {
    setCurriName(e.target.value);
  }

  const handleSelectedStatus = (e) => {
    setVisibleStatus(e.target.value);
  };

  const handleSelectedLang = (e) => {
    setLangTag(e.target.value);
  }

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const postCreateCurri = async (curriName, curriAuthor, visibleStatus, langTag) => {
    try {
      const response = await axios.post('/api/curri/create',
        JSON.stringify({
          curriName: curriName,
          curriAuthor: curriAuthor,
          visibleStatus: visibleStatus,
          langTag: langTag
        }),
        { headers }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateCurriButton = (e) => {
    if (curriName === '') return;

    postCreateCurri(curriName, curriAuthor, visibleStatus, langTag);
    navigate('/home');
  };

  return (
    <div className='create-curri-page-container'>
      <div className='curri-name'>
        <div style={{color: 'white', width: '80px'}}>커리큘럼명</div>
        <input type='text' value={curriName} onChange={handleCurriName} className='curri-name-input' placeholder='커리큘럼 명을 입력해 주세요' spellCheck={false} />
      </div>
      <div className='select-board'>
        <div className='select-box'>
          <select name="option" onChange={handleSelectedStatus} value={visibleStatus}>
            <option value={0} key={0}>ACTIVE</option>
            <option value={1} key={1}>INACTIVE</option>
          </select>
        </div>
      </div>
      <div className='select-board'>
        <div className='select-box'>
          <select name="option" onChange={handleSelectedLang} value={langTag}>
            <option value={0} key={0}>Back</option>
            <option value={1} key={1}>Front</option>
          </select>
        </div>
      </div>
      <button className='curri-create-button' onClick={handleCreateCurriButton}>커리큘럼 생성</button>
    </div>
  )
}