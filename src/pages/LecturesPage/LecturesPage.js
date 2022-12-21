import Header from "../Header/Header";
import './LecturesPage.css';
import filterIcon from "../../assets/filterIcon.png";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Lectures from "./Lectures";
import LectureSearch from "./LectureSearch/LectureSearch";
import keywordMinusIcon from '../../assets/keywordMinusIcon.png';
import keywordPlusIcon from '../../assets/keywordPlusIcon.png';
import keywordDropIcon from '../../assets/keywordDropIcon.png';
import AllLectures from "./AllLectures/AllLectures";
import ScrappedLectures from "./ScrappedLectures/ScrappedLectures";
import LectureSelectModal from './LectureSelectModal/LectureSelectModal';

export default React.memo(function LecturesPage() {

  const [subject, setSubject] = useState(null);
  const [material, setMaterial] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [allLectures, setAllLectures] = useState(true);
  const [lectureSelectModalOn, setLectureSelectModalOn] = useState(false);

  console.log(subject, material, pricing, searchInput);
  const handleSubjectClick = (lang) => {
    if (subject !== lang) {
      setSubject(lang);
      return;
    }

    setSubject(null);
  }

  const handleTypeClick = (type) => {
    if (material !== type) {
      setMaterial(type);
      return;
    }

    setMaterial(null);
  }

  const handlePriceClick = (price) => {
    if (pricing !== price) {
      setPricing(price);
      return;
    }

    setPricing(null);
  }

  const selectAllLectures =()=>{
    setAllLectures(true)
  };

  const selectScrappedLectures =()=>{
    setAllLectures(false)
  };
  
  
  return (
    <>
      <Header />
      <div className="lecture-page-container">
        <div className="lecture-list-text-container">
          <div className="lecture-list-text">강의 리스트</div>
          <div className="filter-icon-box">
            <img src={filterIcon} alt="" />
          </div>
        </div>
        <LectureSearch setSearchInput={setSearchInput}/>
        <div className="filter-title">
          <div className="filter-lang-title">언어</div>
          <div className="filter-vertical-line"></div>
          <div className="filter-material-title">매체</div>
          <div className="filter-vertical-line"></div>
          <div className="filter-pricing-title">유/무료</div>
        </div>
        <div className="keywords-container">
          <div className="keywords-subject-container">
            {(subject === null) && 
              <button className='keyword' onClick={() => setLectureSelectModalOn(true)}>
                <div className='filter-text'>전체</div>
                <img className="keyword-drop-icon" src={keywordDropIcon} alt=""/>
            </button> }
            {(subject === 'Front') && 
              <button className={subject === 'Front' ? 'keyword red' : 'keyword'} onClick={() => handleSubjectClick('Front')}>
                <div className='filter-text'>Front</div>
                {subject === 'Front' ?
                  <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick('Front')}/> :
                  <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick('Front')}/>
                }
            </button> }
            {(subject === 'Back') && <button className={subject === 'Back' ? 'keyword green' : 'keyword'} onClick={() => handleSubjectClick('Back')}>
              <div>Back</div>
              {subject === 'Back' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt=""  onClick={() => handleSubjectClick('Back')}/> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt=""  onClick={() => handleSubjectClick('Back')}/>}
            </button> }
            {(subject === 'Python') && <button className={subject === 'Python' ? 'keyword blue': 'keyword'} onClick={() => handleSubjectClick("Python")}>
              <div>Python</div>
              {subject === 'Python' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick("Python")}/> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick("Python")}/>}
            </button>}
            {(subject === 'C 언어') && <button className={subject === 'C 언어' ? 'keyword gray': 'keyword'} onClick={() => handleSubjectClick('C 언어')}>
              <div>C 언어</div>
              {subject === 'C 언어' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick('C 언어')} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick('C 언어')} />}
            </button>}
          </div>
          <div className="keywords-subject-container">
            {(material === null) && 
              <button className='keyword' onClick={() => setLectureSelectModalOn(true)}>
                <div className='filter-text'>전체</div>
                <img className="keyword-drop-icon" src={keywordDropIcon} alt=""/>
            </button> }
            {(material === '서적') && <button className={material === '서적' ? 'keyword white': 'keyword'} onClick={() => handleTypeClick('서적')}>
              서적
              {material === '서적' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleTypeClick('서적')} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleTypeClick('서적')} />}
            </button>}
            {(material === '영상') && <button className={material === '영상' ? 'keyword white': 'keyword'} onClick={() => handleTypeClick('영상')}>
              영상
              {material === '영상' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleTypeClick('영상')} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleTypeClick('영상')} />}
            </button>}
          </div>
          <div>
            {(pricing === null) && 
              <button className='keyword' onClick={() => setLectureSelectModalOn(true)}>
                <div className='filter-text'>전체</div>
                <img className="keyword-drop-icon" src={keywordDropIcon} alt=""/>
            </button> }
            {(pricing === '무료') && <button className={pricing === '무료' ? 'keyword darkgray': 'keyword'} onClick={() => handlePriceClick('무료')}>
              무료
              {pricing === '무료' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handlePriceClick('무료')} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handlePriceClick('무료')} />}
            </button>}
            {(pricing === '유료') && <button className={pricing === '유료' ? 'keyword darkgray': 'keyword'} onClick={() => handlePriceClick('유료')}>
              유료
              {pricing === '유료' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handlePriceClick('유료')} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handlePriceClick('유료')} />}
            </button>}
          </div>
        </div>
        <LectureSelectModal
          isOpen={lectureSelectModalOn}
          onRequestClose={() => setLectureSelectModalOn(false)}
          subject={subject}
          material={material}
          pricing={pricing}
          handleSubjectClick={handleSubjectClick}
          handleTypeClick={handleTypeClick}
          handlePriceClick={handlePriceClick}
        />
        {(!subject && !material && !pricing && !searchInput) &&
          <div className="select-lectures">
            <div className={`select-lectures-items ${allLectures ? 'success' : 'fail'}`} onClick={selectAllLectures}>전체 강의</div>
            <div className={`select-lectures-items ${allLectures ? 'fail' : 'success'}`} onClick={selectScrappedLectures}>즐겨 찾기</div>
            <div className={`green-bar ${allLectures ? 'success' : 'fail'}`}></div>
            <div className={`green-bar ${allLectures ? 'fail' : 'success'}`}></div>
          </div>
        }
        {(!subject && !material && !pricing && !searchInput && allLectures) && <AllLectures />}
        {(!subject && !material && !pricing && !searchInput && !allLectures) && <ScrappedLectures />}

        {(subject || material || pricing || searchInput) && <Lectures
          lang={subject}
          type={material}
          price={pricing}
          searchInput={searchInput}
          title="검색된 강의"
        />}
      </div>
    </>
  )
});