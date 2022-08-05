import Header from "../Header/Header";
import './LecturesPage.css';
import Search from "../Search/Search";
import filterIcon from "../../assets/filterIcon.png";
import keywordPlusIcon from '../../assets/keywordPlusIcon.png';
import LowBar from "../LowBar/LowBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Lecture from "./Lecture/Lecture";
import keywordMinusIcon from '../../assets/deleteFilterIcon.png';

export default function LecturesPage() {
  const [lectures, setLectures] = useState(null);
  const [error, setError] = useState(false);
  const [loading, isLoading] = useState(false);
  const [subject, setSubject] = useState(null);
  const [material, setMaterial] = useState(null);
  const [pricing, setPricing] = useState(null);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const fetchLectures = async () => {
    try {
      isLoading(true);
      setError(false);
      const response = await axios.get('/api/lecture/getLectureList', { headers });
      setLectures(response.data.result);
      console.log(lectures);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    isLoading(false);
  };
  
  const handleFrontClick = () => {
    if (subject === null) {
      setSubject('Front');
      return;
    }

    setSubject(null);
  };

  const handleBackClick = () => {
    if (subject === null) {
      setSubject('Back');
      return;
    }

    setSubject(null);
  };

  const handlePythonClick = () => {
    if (subject === null) {
      setSubject('Python');
      return;
    }

    setSubject(null);
  };

  const handleCClick = () => {
    if (subject === null) {
      setSubject('C 언어');
      return;
    }

    setSubject(null);
  };

  const handleBookClick = () => {
    if (material === null) {
      setMaterial('서적');
      return;
    }

    setMaterial(null);
  };

  const handleVideoClick = () => {
    if (material === null) {
      setMaterial('영상');
      return;
    }

    setMaterial(null);
  };

  const handleFreeClick = () => {
    if (pricing === null) {
      setPricing('무료');
      return;
    }

    setPricing(null);
  };

  const handleCostClick = () => {
    if (pricing === null) {
      setPricing('유료');
      return;
    }

    setPricing(null);
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  if (loading) return;
  if (!lectures) return;
  if (error) return;

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
        <Search />
        <div className="keywords-container">
          <div className="keywords-subject-container">
            {(subject === 'Front' || subject === null) && <button className={subject === 'Front' ? 'keyword red' : 'keyword'} onClick={handleFrontClick}>
              Front
              {subject === 'Front' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={handleFrontClick}/> :
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={handleFrontClick}/>}
            </button> }
            {(subject === 'Back' || subject === null) && <button className={subject === 'Back' ? 'keyword green' : 'keyword'} onClick={handleBackClick}>
              <div>Back</div>
              {subject === 'Back' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt=""  onClick={handleBackClick}/> : 
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt=""  onClick={handleBackClick}/>}
            </button> }
            {(subject === 'Python' || subject === null) && <button className={subject === 'Python' ? 'keyword blue': 'keyword'} onClick={handlePythonClick}>
              <div>Python</div>
              {subject === 'Python' ?
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={handlePythonClick}/> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={handlePythonClick}/>}
            </button>}
            {(subject === 'C 언어' || subject === null) && <button className={subject === 'C 언어' ? 'keyword gray': 'keyword'} onClick={handleCClick}>
              <div>C 언어</div>
              {subject === 'C 언어' ? 
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={handleCClick} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={handleCClick} />}
            </button>}
          </div>
          <div className="keywords-subject-container">
          {(material === '서적' || material === null) && <button className={material === '서적' ? 'keyword white': 'keyword'} onClick={handleBookClick}>
              서적
              {material === '서적' ? 
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={handleBookClick} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={handleBookClick} />}
            </button>}
            {(material === '영상' || material === null) && <button className={material === '영상' ? 'keyword white': 'keyword'} onClick={handleVideoClick}>
              영상
              {material === '영상' ? 
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={handleVideoClick} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={handleVideoClick} />}
            </button>}
          </div>
          <div>
          {(pricing === '무료' || pricing === null) && <button className={pricing === '무료' ? 'keyword darkgray': 'keyword'} onClick={handleFreeClick}>
              무료
              {pricing === '무료' ? 
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={handleFreeClick} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={handleFreeClick} />}
            </button>}
            {(pricing === '유료' || pricing === null) && <button className={pricing === '유료' ? 'keyword darkgray': 'keyword'} onClick={handleCostClick}>
              유료
              {pricing === '유료' ? 
                <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={handleCostClick} /> :
                <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={handleCostClick} />}
            </button>}
          </div>
        </div>
        <div className="lecture-list">
          {lectures.map(lecture => {
            return <Lecture lecture={lecture} key={lecture.lectureIdx}/>
          })}
        </div>
      </div>
    </>
  )
}