import Header from "../Header/Header";
import "./BeginPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CurriNavigation from "./CurriNavigation/CurriNavigation";
import CurriMain from "./CurriMain/CurriMain";

export default function BeginPage() {

  const [curriList, setCurriList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [curri, setCurri] = useState(null);
  const [error, setError] = useState(null);
  const [displayedCurri, setDisplayedCurri] = useState(0);
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
      setCurriList(response.data.result.sort((a, b) => b.createdAt - a.createdAt));
    } catch(e) {
      console.log("커리 리스트 오류", e);
      setError(e);
    }
    setLoading(false);
  };
  const getCurriDetail = async (curriIdx) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/curri/getThisCurri/${curriIdx}`, { headers });
      console.log("커리 디테일", response);
      setCurri(response.data.result);
    } catch (e) {
      console.log("커리 디테일 오류", e);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCurriList();
  }, []);

  useEffect(() => {
    console.log('ff');
    if (curriList === null) return;
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
      {curriList !== null && !(curriList.length !== 0 && curri === null) &&
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
            getCurriList={getCurriList}
          />
        </>
      }
    </>
  );
}