import { useState } from "react";
import LectureDetail from "./LectureDetail";
import "./SearchLecture.css";

export default function Lecture(props) {
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
            <a href={props.lecture.materialUrl}>바로가기</a>
            {/* <button onClick={handleLectureClick} style={{marginBottom: "30px"}}>
                세부내용
            </button> */}
            {/* {isLectureClicked ?
                <LectureDetail class="lectureDetail" id={props.lecture.lectureIdx} detailData={props.lecture.lectureDetail}/> : <br />
            } */}
        </div>
    );
}