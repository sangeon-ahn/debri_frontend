import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Search from "../Search/Search";
import './PostPage.css';
import leftArrow from '../../assets/leftArrow.png';
import grayUpThumb from '../../assets/grayUpThumb.png';
// import greenUpThumb from '../../assets/greenUpThumb.png';
import reComment from '../../assets/reComment.png'
import recommentArrow from '../../assets/recommentArrow.png';
import postUserProfile from '../../assets/postUserProfile.png';
import userReport from '../../assets/userReport.png';

export default function PostPage() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params)
  return (
    <>
      <Header />
      <Search />
      {/* <div className="post-container">
        <div className='board-title-box'>
          <button className='back-button' onClick={() => navigate(-1)}>
            <img src={leftArrow} alt=''/>
          </button>
          <div className='board-title'>{board.text}</div>
        </div>
        <div className="post-subject">
          <div className="post-title-container">
            <div className="post-title-wrapper">
              <span className="post-title-box">{post.title}</span>
              <div className="post-comment-number">(2)</div>
            </div>
            <div className="post-elapsed-time">5분 전</div>
          </div>
          <div className="post-user-info">
            <div className="post-user-profile">
              <img src={postUserProfile} alt="엑박" />
            </div>
            <div className="post-user-nickname">데브리짱짱걸 ></div>
          </div>
        </div>
        <div className="report-user-box">
          <div className="report-icon-box">
            <img src={userReport} alt='엑박' />
          </div>
          <div className="post-report-text">신고하기</div>
        </div>
        <div className="post-main-content">{post.content}</div>
        <div className="post-button-container">
          <button className="up-vote-button">추천</button>
          <button className="scrap-button">스크랩</button>
        </div>
        <div className="comments-container">
          <div className="comment-container">
            <div className="comment-content">
              지금 장난하나 ㅡㅡ 아니 코딩이 장난이에요? 최소한 검색 정도는 할 줄 알아야지 얼탱이가 밤탱이네요 ㅡㅡ 님은 코딩하지마삼
            </div>
            <div className="comment-detail">
              <div className="comment-user-name"><span>데브리짱짱보이 ></span></div>
              <div className="comment-elapsed-time">5분 전</div>
              <div className="comment-button-box">
                  <img src={grayUpThumb} alt='' className="gray-upthumb-icon"/>
                <div className="up-vote-number">0</div>
                <div className="barrier-line"></div>
                  <img src={reComment} alt='' className="recomment-icon"/>
              </div>
            </div>
          </div>
          <div className="recomment-container">
            <div className="recomment-arrow-box">
              <img src={recommentArrow} alt='' className="recomment-arrow" />
            </div>
            <div className="recomment-main">
              <div className="recomment-content">지금 장난 둘^^</div>
              <div className="recomment-user"></div>
            </div>
            <div className="recomment-button-box"></div>
          </div>
        </div>
      </div>
      <div style={{position:"fixed", zIndex: 1, width: '360px', height: '100px', backgroundColor: '#0A1123', bottom: '10px'}} ></div> */}
    </>
  );
}