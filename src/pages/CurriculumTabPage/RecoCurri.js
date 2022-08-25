import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import './CurriculumTabPage.css';
import leftArrow from '../../assets/leftArrow.png';
import greenHeart from '../../assets/greenHeart.png';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import LatestCurri from './LatestCurri/LatestCurri';

export default function BoardsPage() {
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러
    const [scrapCurrilist, setScrapCurrilist] = useState(null);
    const navigate = useNavigate();

    const headers = {
        'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    useEffect( () =>{
        searchScrapCurriList();
    },[]);

    const searchScrapCurriList = async () => {
        try {
            setError(null);
            setLoading(true); //로딩이 시작됨
            const response = await axios.get(`/api/curri/getScrapList`, { headers });
            setScrapCurrilist(response.data.result)
            console.log(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
      };

    return (
        <div>
            <Header></Header>
            <div className='post-list'>
                <img src={leftArrow} alt="엑박" width="9.44px" height="16.19px" className='left-arrow' onClick={()=>{navigate("/curriculum")}}/>
                <div className='scrapCurriTitle'>내가 추천한 커리큘럼</div>
                <img src={greenHeart} alt="액박" className="bookmark_Curri"/>
                <div>
                    {scrapCurrilist && <div>
                    {scrapCurrilist.map(curri => {
                        return <LatestCurri key={curri.curriIdx} curri={curri}/>
                    })}
                    </div>}
                </div>
            </div>                   
        </div>
    )
}