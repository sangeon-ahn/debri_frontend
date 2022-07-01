import { useState } from "react";
import LectureDetail from "./LectureDetail";
import "./SearchLecture.css";

export default function Lecture(props) {
    const [isLectureClicked, setIsLectureClicked] = useState(false);

    const lectureDetailStyle = {
        display: "block",
        border: "1px solid black",
        marginTop: "30px",
        fontSize: "50px"
    };

    function handleLectureClick() {
        setIsLectureClicked(state => {
            return !state;
        });
    }

    return (
        <div>
            <div
                id="lecture">강의명:{props.lecture.title}
                <br />
            </div>
            <a href={props.lecture.url}>링크</a>
            {props.lecture.url}
            <button onClick={handleLectureClick} style={{marginBottom: "30px"}}>
                세부내용
            </button>
            {isLectureClicked ?
                <LectureDetail class="lectureDetail" id={props.lecture.title} detailData={props.lecture.lectureDetail}/> : <br />
            }
        </div>
    );
}