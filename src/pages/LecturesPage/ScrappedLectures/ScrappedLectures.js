import axios from "axios"
import { useEffect, useState } from "react";
import Lecture from "../Lecture/Lecture";
import './ScrappedLectures.css';

export default function ScrappedLectures() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrappedLectures, setScrappedLectures] = useState(null);
  console.log(scrappedLectures);

  const fetchScrappedLectures = async () => {
    try {

      const response = await axios.get(`api/lecture/getScrapList/${userData.userIdx}`, { headers });
      setScrappedLectures(response.data.result);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  useEffect(() => {
    fetchScrappedLectures();
  }, []);

  if (error) return null;

  return (
    <div className="scrapped-lectures-container">
      <div className="scrapped-lectures-container-title">즐겨찾기한 강의</div>
      <div className="scrapped-lectures">
      {scrappedLectures && scrappedLectures.map(scrappedLecture => {
        return <Lecture lecture={scrappedLecture} key={scrappedLecture.lectureIdx} isScrappedLecture={true} />
      })}
    </div>
    </div>
  )
}