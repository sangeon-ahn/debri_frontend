import { useState } from "react";
import LectureDetail from "./LectureDetail";
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';
import "./SearchLecture.css";
import axios from "axios";

export default function Lecture(props) {
    const [user, setUser] = useRecoilState(userId);
    const [curriIdx, setCurriIdx] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

    function handleCurriAddButton() {
        const fetchLectures = async (curriIdx, lectureIdx, userIdx) => {
            try {
                setError(null);
                setLoading(true);
                
                const response = await axios.post(`/api/lecture/collect`,
                  JSON.stringify(
                    {
                        curriIdx : curriIdx,
                        lectureIdx : lectureIdx,
                        userIdx : userIdx
                    }),
                  { headers }
                );
            // console.log(response.data.result.collectSuccess);
            setCurriIdx(curriIdx + 1);
            alert('내 커리큘럼에 추가되었어요!')
            } catch (error) {
                console.log(error);
            }
        }
    
        fetchLectures(curriIdx, props.lecture.lectureIdx, user);
    }
    
    console.log(props);
    // const [isLectureClicked, setIsLectureClicked] = useState(false);

    // function handleLectureClick() {
    //     setIsLectureClicked(state => {
    //         return !state;
    //     });
    // }

    return (
        <div>
            <span>강의명:{props.lecture.lectureName}</span>
            <br />
            <br />
            <span>강의설명: {props.lecture.lectureDescription}</span>
            <br />
            <br />
            <span>가격: {props.lecture.pricing}</span>
            <br />
            <br />
            <div className="bottom-attach">
                <a href={props.lecture.materialUrl}>바로가기</a>
                <button style={{fontSize:"15px"}} onClick={handleCurriAddButton}>커리큘럼에 추가</button>
            </div>
            {/* <button onClick={handleLectureClick} style={{marginBottom: "30px"}}>
                세부내용
            </button> */}
            {/* {isLectureClicked ?
                <LectureDetail class="lectureDetail" id={props.lecture.lectureIdx} detailData={props.lecture.lectureDetail}/> : <br />
            } */}
        </div>
    );
}