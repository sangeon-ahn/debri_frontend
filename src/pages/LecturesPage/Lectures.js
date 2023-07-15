import { useState, useCallback, useLayoutEffect } from "react";
import Lecture from "./Lecture/Lecture";
import axios from "axios";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

export default function Lectures(props) {
  const { lang, type, price, pageNum, searchInput, title, filterHeight } = props;

  const [lectures, setLectures] = useState(null);
  const [error, setError] = useState(false);
  const [loading, isLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  useLayoutEffect(() => {
    fetchLecturesWithFilter(lang, type, price, searchInput, pageNum);
  }, [lang, type, price, searchInput, pageNum]);

  const fetchLecturesWithFilter = async (lang, type, price, key, pageNum) => {
    try {
      setError(false);
      const response = await axios.get(`${baseUrl}/api/lecture/search?lang=${lang}&type=${type}&price=${price}&key=${key}&pageNum=${pageNum}`, { headers });
      setLectures(response.data.result.lectureList);
      console.log(response);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  const lectureListStyle = {
    width: '338px',
    marginTop: '14px',
    height: (440 - filterHeight) + 'px',
    overflowX: 'hidden'
  
  }
  if (error) return null;

  return (
    <div className="lectures-container">
      <div className="lectures-title">{title}</div>
      <div className="lecture-list" style={lectureListStyle}>
        {lectures && lectures.map(lecture => {
          return <Lecture lecture={lecture} key={lecture.lectureIdx} isScrappedLecture={lecture.userScrap} />
        })}
      </div>
    </div>
  );
}
