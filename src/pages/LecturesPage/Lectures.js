import { useState, useCallback, useLayoutEffect } from "react";
import Lecture from "./Lecture/Lecture";
import axios from "axios";

export default function Lectures(props) {
  const { lang, type, price, searchInput } = props;

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

  const fetchLecturesWithFilter = useCallback(async (lang, type, price, key) => {
    
    try {
      setLectures(null);
      isLoading(true);
      setError(false);
      const response = await axios.get(`/api/lecture/search?lang=${lang}&type=${type}&price=${price}&key=${key}`, { headers });
      setLectures(response.data.result);
      console.log(response.data.result);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    isLoading(false);
  }, [headers]);

  if (error) return null;
  if (loading) return null;

  return (
    <div className="lecture-list">
      {lectures && lectures.map(lecture => {
        return <Lecture lecture={lecture} key={lecture.lectureIdx}/>
      })}
    </div>
  );
}