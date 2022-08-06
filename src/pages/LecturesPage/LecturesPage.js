import Header from "../Header/Header";
import './LecturesPage.css';
import Search from "../Search/Search";
import filterIcon from "../../assets/filterIcon.png";
import keywordPlusIcon from '../../assets/keywordPlusIcon.png';
import LowBar from "../LowBar/LowBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Lecture from "./Lecture/Lecture";

export default function LecturesPage() {
  const [lectures, setLectures] = useState(null);
  const [error, setError] = useState(false);
  const [loading, isLoading] = useState(false);

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
            <div className="keyword">
              <div>Front</div>
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              <div>Front</div>
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              <div>Front</div>
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              <div>Front</div>
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
          </div>
          <div className="keywords-subject-container">
            <div className="keyword">
              Front
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              Front
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
          </div>
          <div>
            <div className="keyword">
              Front
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
            <div className="keyword">
              Front
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" />
            </div>
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