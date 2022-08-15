import Header from "../Header/Header";
import "./BeginPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CurriNavigation from "./CurriNavigation/CurriNavigation";
import CurriMain from "./CurriMain/CurriMain";

export default function BeginPage() {

  const [curriList, setCurriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curri, setCurri] = useState([]);
  const [error, setError] = useState(null);
  const [displayedCurri, setDisplayedCurri] = useState(0);
  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("userData")).jwt),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const getCurriList = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/curri/getList', { headers });
      console.log(response);
      setCurriList(response.data.result);
    } catch(e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  const getCurriDetail = async (curriIdx) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/curri/getThisCurri/${curriIdx}`, { headers });
      console.log(response);
      setCurri(response.data.result);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCurriList();
  }, []);

  useEffect(() => {
    if (curriList.length === 0) return;
    if (displayedCurri === curriList.length) return;

    getCurriDetail(curriList[displayedCurri].curriIdx);
  }, [displayedCurri, curriList]);

  const showPrevCurri = () => {
    setDisplayedCurri(state => state - 1);
  };

  const showNextCurri = () => {
    setDisplayedCurri(state => state + 1);
  };

  if (error) return null;

  return (
    <>
      <Header />
      {curriList.length !== 0 &&
        <>
          <CurriNavigation
            showPrevCurri={showPrevCurri}
            showNextCurri={showNextCurri}
            currentCurriPosition={displayedCurri}
            lastCurriPosition={curriList.length}
            curri={curri}
          />
          <CurriMain
            curri={curri}
            currentCurriPosition={displayedCurri}
            numberOfCurries={curriList.length}
          />
        </>
      }
    </>
  );
}