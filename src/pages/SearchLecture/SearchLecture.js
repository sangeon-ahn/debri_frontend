import { useState } from "react";

export default function SearchLecture() {
    const [lecture, setlecture] = useState('');
    const lectureData = [
        {
            id:1,
            title: "렉처1",
            url:"http://www.naver.com"
        },
        {
            id:2,
            title: "렉처2",
            url: "http://www.google.com"
        }
    ];

    function handleLectureInput(e) {
        setlecture(e.target.value);
    }

    function handleSearchButton(e) {
        e.preventDefault();
        setlecture('');
    }

    return (
        <div>
            <br />
            <form>
                강의검색
                <input
                    type="text"
                    value={lecture}
                    onChange={handleLectureInput}
                    placeholder="강의를 검색하세요"
                />
                <button
                    onClick={handleSearchButton}
                >
                검색
                </button>
            </form>
            <div>
                {lectureData.map((lecture, i) => {
                    return (
                        <div id="lecture" key={i}>강의명:{lecture.title} 링크:{lecture.url}</div>
                    );
                })}
            </div>
        </div>
    );
}

