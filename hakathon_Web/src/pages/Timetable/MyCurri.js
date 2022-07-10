import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';
import axios from "axios";

function Timetable() {
  const [user, setUser] = useRecoilState(userId);
  const [Result, setResult] = useState(null); 
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러   
  console.log(user); 

  const fetchCurri = async (useridx) => { 
      try {
          setResult(null);
          setError(null);
          setLoading(true); //로딩이 시작됨
          const response = await axios.get(`/api/lecture/getlist/${useridx}`);
          setResult(response.data.result);
          console.log(Result)
      } catch (e) {
          setError(e);
      }
      setLoading(false);
  };

  useEffect( () =>{
      fetchCurri(user);
  },[] )

  if (loading) return <div>로딩중..</div>
  if (error) return <div>에러 발생!!</div>
  if (!Result) return null; 
  console.log(Result)
  
  return (
    <div>
      <Header />
                <div className="lectures">
                    {Result.map((lecture, i) => {
                        return (
                            <div className="lectureStyle" key={i}>
                                <span>강의명: {lecture.lectureName}</span>
                                <span>강의설명: {lecture.lectureDescription}</span>
                                <span>가격: {lecture.pricing}</span>
                                <div className="bottom-attach">
                                    <a href={lecture.materialUrl}>바로가기</a>
                                </div>
                            </div>
                        )
                    })}
                </div>

    </div>
  );
}
export default Timetable;
