import Header from "../Header/Header";
import './LecturesPage.css';
import filterIcon from "../../assets/filterIcon.png";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Lectures from "./Lectures";
import LectureSearch from "./LectureSearch/LectureSearch";
import LecturesFilter from "./LecturesFilter";
import AllLectures from "./AllLectures/AllLectures";
import ScrappedLectures from "./ScrappedLectures/ScrappedLectures";

export default React.memo(function LecturesPage() {

  const [subject, setSubject] = useState(null);
  const [material, setMaterial] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [allLectures, setAllLectures] = useState(true);
  console.log(subject, material, pricing, searchInput);
  const handleSubjectClick = (lang) => {
    if (subject === null) {
      setSubject(lang);
      return;
    }

    setSubject(null);
  }

  const handleTypeClick = (type) => {
    if (material === null) {
      setMaterial(type);
      return;
    }

    setMaterial(null);
  }

  const handlePriceClick = (price) => {
    if (pricing === null) {
      setPricing(price);
      return;
    }

    setPricing(null);
  }

  const [filterHeight, setFilterHeight] = useState(null);

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
        <LecturesFilter
          subject={subject}
          material={material}
          pricing={pricing}
          handleSubjectClick={handleSubjectClick}
          handleTypeClick={handleTypeClick}
          handlePriceClick={handlePriceClick}
          setFilterHeight={setFilterHeight}
        />

        <div className="select-lectures">
          <div className={`select-lectures-items ${allLectures ? 'success' : 'fail'}`} onClick={selectAllLectures}>전체 강의</div>
          <div className={`select-lectures-items ${allLectures ? 'fail' : 'success'}`} onClick={selectScrappedLectures}>즐겨 찾기</div>
          <div className={`green-bar ${allLectures ? 'success' : 'fail'}`}></div>
          <div className={`green-bar ${allLectures ? 'fail' : 'success'}`}></div>
        </div>
        {(!subject && !material && !pricing && !searchInput && allLectures) && <AllLectures />}
        {(!subject && !material && !pricing && !searchInput && !allLectures) && <ScrappedLectures />}

        {(subject || material || pricing || searchInput) && <Lectures
          lang={subject}
          type={material}
          price={pricing}
          searchInput={searchInput}
          title="검색된 강의"
          filterHeight={filterHeight}
        />}
      </div>
    </>
  )
});