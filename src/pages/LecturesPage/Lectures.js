import { useState, useCallback, useLayoutEffect } from "react";
import Lecture from "./Lecture/Lecture";
import axios from "axios";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

export default function Lectures(props) {
  const { lang, type, price, searchInput, title, filterHeight } = props;

  const [lectures, setLectures] = useState(null);
  const [error, setError] = useState(false);
  const [loading, isLoading] = useState(false);
  
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  useLayoutEffect(() => {
    fetchLecturesWithFilter(lang, type, price, searchInput);
  }, [lang, type, price, searchInput]);

  const fetchLecturesWithFilter = async (lang, type, price, key) => {
    try {
      setError(false);
      const response = await axios.get(`/api/lecture/search?lang=${lang}&type=${type}&price=${price}&key=${key}`, { headers });
      setLectures(response.data.result);
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