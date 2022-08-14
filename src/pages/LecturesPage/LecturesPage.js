import Header from "../Header/Header";
import './LecturesPage.css';
import filterIcon from "../../assets/filterIcon.png";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Lectures from "./Lectures";
import LectureSearch from "./LectureSearch/LectureSearch";
import LecturesFilter from "./LecturesFilter";
import ScrappedLectures from "./ScrappedLectures/ScrappedLectures";

export default React.memo(function LecturesPage() {

  const [subject, setSubject] = useState(null);
  const [material, setMaterial] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [searchInput, setSearchInput] = useState('');
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
        <LecturesFilter
          subject={subject}
          material={material}
          pricing={pricing}
          handleSubjectClick={handleSubjectClick}
          handleTypeClick={handleTypeClick}
          handlePriceClick={handlePriceClick}
          setFilterHeight={setFilterHeight}
        />
        {(!subject && !material && !pricing && !searchInput) && <ScrappedLectures />
        }
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