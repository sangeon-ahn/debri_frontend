import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import './Board.css';
import PostSummary from './PostSummary/PostSummary';

export default function BoardsPage() {
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러
    const [scrapPostslist, setScrapPostslist] = useState(null);

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
            const response = await axios.get(`api/post/getMyScrap`, { headers });
            setScrapPostslist(response.data.result)
            console.log(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
      };

    return (
        <div>
            <p style={{color:"white"}}>내가 스크랩한 게시물</p>
            <div>
                {scrapPostslist && <div>
                {scrapPostslist.map(post => (
                    <PostSummary post={post} key={post.postIdx} boardName={null} />
                ))}
                </div>}
            </div>
        </div>
    )
}