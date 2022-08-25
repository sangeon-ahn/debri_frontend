import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import './Board.css';
import PostSummary from './PostSummary/PostSummary';
import leftArrow from '../../assets/leftArrow.png';
import bookmarkGreen from '../../assets/bookmarkGreen.png';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function BoardsPage() {
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러
    const [scrapPostslist, setScrapPostslist] = useState(null);
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const headers = {
        'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    useEffect( () =>{
        searchScrapPostsList();
    },[]);

    const searchScrapPostsList = async () => {
        try {
            setError(null);
            setLoading(true); //로딩이 시작됨
<<<<<<< HEAD
            const response = await axios.get(`/api/post/getMyScrap`, { headers });
=======
            const response = await axios.get(`${baseUrl}api/post/getMyScrap`, { headers });
>>>>>>> 3f0105f89ba306c906030acd1778abef9aa5625c
            setScrapPostslist(response.data.result)
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
                <img src={leftArrow} alt="엑박" width="9.44px" height="16.19px" className='left-arrow' onClick={()=>{navigate("/boards")}}/>
                <div className='scrapPostTitle'>내가 스크랩한 게시물</div>
                <img src={bookmarkGreen} alt="액박" className="bookmark_Posts"/>
                <div>
                    {scrapPostslist && <div>
                    {scrapPostslist.map(post => (
                        <PostSummary post={post} key={post.postIdx} boardName={null} />
                    ))}
                    </div>}
                </div>
            </div>                   
        </div>
    )
}