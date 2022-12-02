import axios from "axios"
import { useEffect, useState } from "react";
import Lecture from "../Lecture/Lecture";
import './AllLectures.css';

export default function AllLectures() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allLectures, setAllLectures] = useState(null);
  console.log(allLectures);

  const fetchAllLectures = async () => {
    try {

      const response = await axios.get(`${baseUrl}/api/lecture/getLectureList`, { headers });
      setAllLectures(response.data.result);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  useEffect(() => {
    fetchAllLectures();
  }, []);

  if (error) return null;

  return (
    <div className="scrapped-lectures-container">
      <div className="scrapped-lectures">
      {allLectures && allLectures.map(allLecture => {
        return <Lecture lecture={allLecture} key={allLecture.lectureIdx} isScrappedLecture={allLecture.userScrap} />
      })}
    </div>
    </div>
  )
}