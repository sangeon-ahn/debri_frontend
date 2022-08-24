import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AddLectureToCurri() {
  const [loading, setLoading] = useState(false);
  const [curriList, setCurriList] = useState(null);
  const [error, setError] = useState(false);
  const { state } = useLocation();
  const lectureIdx = state.lectureIdx;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("userData")).jwt),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const getCurriList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/curri/getList`, { headers });
      console.log("커리리스트", response);
      setCurriList(response.data.result);
    } catch(e) {
      console.log("커리 리스트 오류", e);
      setError(e);
    }
    setLoading(false);
  };

  const postInsertLecture = async (curriIdx, lectureIdx) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/curri/insertLecture`,
        JSON.stringify({
          curriIdx: curriIdx,
          lectureIdx: lectureIdx
        }),
        { headers }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const handleAddLectureToCurri = (curriIdx) => {
    postInsertLecture(curriIdx, lectureIdx);
  };

  useEffect(() => {
    getCurriList();
  }, []);
  
  if (loading) return null;
  if (curriList === null) return null;

  console.log(curriList);

  return (
    <div className="select-curri" style={{width: '360px'}}>
      {curriList.map(curri => {
        return (
          <button
            style={{width: '360px', height: "60px", color: 'black'}}
            onClick={() => handleAddLectureToCurri(curri.curriIdx)}>
            {curri.curriName}
          </button>
        )
      })}
    </div>
  );
}