import { useState } from "react";
import Lecture from "./Lecture";
import "./SearchLecture.css";
import Header from "../Header/Header";

export default function SearchLecture() {
    const [lectureInput, setlectureInput] = useState('');
    const [lectureData, setLectureData] = useState([]);

    const FetchedLectureData = [
        {
            id:1,
            title: "렉처1",
            url:"http://www.naver.com",
            lectureDetail: {
                title: "리그오브레전드 브론즈 찍기",
                time: "월/금 01:00 ~ 02:00",
                text: "SQL과 PYC 관련 수강생들의 강추",
                url:"http://www.naver.com",
            }
        },
        {
            id:2,
            title: "렉처2",
            url: "http://www.google.com",
            lectureDetail: {
                title: "리그오브레전드 골드 찍기",
                time: "월/금 01:00 ~ 02:00",
                text: "SQL과 PYC 관련 수강생들의 강추",
                url:"http://www.naver.com",
            }
        },
        {
            id:3,
            title: "렉처3",
            url: "http://www.gmail.com",
            lectureDetail: {
                title: "리그오브레전드 다이아 찍기",
                time: "월/금 01:00 ~ 02:00",
                text: "SQL과 PYC 관련 수강생들의 강추",
                url:"http://www.naver.com",
            }
        },
        {
            id:4,
            title: "렉처4",
            url: "http://www.nate.com",
            lectureDetail: {
                title: "리그오브레전드 챌린저 찍기",
                time: "월/금 01:00 ~ 02:00",
                text: "SQL과 PYC 관련 수강생들의 강추",
                url:"http://www.naver.com",
            }
        }
    ];

    function handleLectureInput(e) {
        setlectureInput(e.target.value);
    }

    function handleSearchButton(e) {
        e.preventDefault();
        setLectureData(FetchedLectureData);
    }

    return (
        <div>
            <Header />
            <div>
                <br />
                <form id="lecture-search-form">
                    <span>강의 검색</span>
                    <input
                        type="text"
                        value={lectureInput}
                        onChange={handleLectureInput}
                        placeholder="강의를 검색하세요"
                    />
                    <button
                        onClick={handleSearchButton}
                    >
                    검색
                    </button>
                </form>
                <div className="lectures">
                    {
                    lectureData.map((lecture, i) => {
                        return (
                            <div class="lectureStyle" key={i}>
                                <Lecture lecture={lecture} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

