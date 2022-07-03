import { useState } from "react";
import Lecture from "./Lecture";
import "./SearchLecture.css";
import Header from "../Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SearchLecture() {
    const [language, setLanguage] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [lectureKind, setLectureKind] = useState('');
    const [pricing, setPricing] = useState('');
    const [lectureName, setLectureName] = useState('');

    const [addLanguage, setAddLanguage] = useState('');
    const [addDifficulty, setAddDifficulty] = useState(1);
    const [addLectureKind, setAddLectureKind] = useState('');
    const [addPricing, setAddPricing] = useState('');
    const [addLectureName, setAddLectureName] = useState('');
    const [addMaterialUrl, setAddMaterialUrl] = useState('');
    const [addImgUrl, setAddImgUrl] = useState('');
    const [addLectureDescription, setAddLectureDescription] = useState('');

    const [lectureData, setLectureData] = useState([]);

    function handleLanguageInput(e) {
        console.log(e);
        setLanguage(e.target.value);
    }

    function handleDifficultyInput(e) {
        setDifficulty(e.target.value);
    }

    function handleLectureKindInput(e) {
        setLectureKind(e.target.value);
    }

    function handlePricingInput(e) {
        setPricing(e.target.value);
    }

    function handleLectureNameInput(e) {
        setLectureName(e.target.value);
    }


    function handleAddLanguageInput(e) {
        console.log(e);
        setAddLanguage(e.target.value);
    }

    function handleAddDifficultyInput(e) {
        setAddDifficulty(e.target.value);
    }

    function handleAddLectureKindInput(e) {
        setAddLectureKind(e.target.value);
    }

    function handleAddPricingInput(e) {
        setAddPricing(e.target.value);
    }

    function handleAddLectureNameInput(e) {
        setAddLectureName(e.target.value);
    }

    function handleAddMaterialUrlInput(e) {
        setAddMaterialUrl(e.target.value);
    }

    function handleAddImgUrlInput(e) {
        setAddImgUrl(e.target.value);
    }

    function handleAddLectureDescriptionInput(e) {
        setAddLectureDescription(e.target.value);
    }

    function handleSearchButton(e) {
        e.preventDefault();
        const lecturesObj = {language, difficulty, lectureKind, pricing, lectureName};
        const fetchLectures = async (object) => {
            try {
                const response = await axios.post(
                    '/api/lecture/search',
                    object
                );
                console.log(response.data.result);
                setLectureData(response.data.result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLectures(lecturesObj);
    }

    function handleAddLectureButton(e) {
        e.preventDefault();
        const lecturesObj = {
            language: addLanguage,
            difficulty: addDifficulty,
            lectureKind: addLectureKind,
            pricing: addPricing,
            lectureName: addLectureName,
            materialUrl: addMaterialUrl,
            imgUrl: addImgUrl,
            lectureDescription: addLectureDescription};

        console.log(lecturesObj);
        const addLecture = async (object) => {
            try {
                const response = await axios.post(
                    '/api/lecture/add',
                    JSON.stringify({object})
                );
                console.log(response.data);
                // setLectureData(response.data.result);
            } catch (error) {
                console.log(error);
            }
        }
        addLecture(lecturesObj);
    }

    return (
        <div>
            <Header />
            <div className="lecture-search-bar">
                <br />
                <form id="lecture-search-form">
                    <span>강의 검색</span>
                    <input
                        type="text"
                        value={language}
                        onChange={handleLanguageInput}
                        placeholder="언어(C, JAVA)"
                    />
                    <input
                        type="text"
                        value={difficulty}
                        onChange={handleDifficultyInput}
                        placeholder="난이도(1, 2, 3)"
                    />
                    <input
                        type="text"
                        value={lectureKind}
                        onChange={handleLectureKindInput}
                        placeholder="강의 종류"
                    />
                    <input
                        type="text"
                        value={pricing}
                        onChange={handlePricingInput}
                        placeholder="가격"
                    />
                    <input
                        type="text"
                        value={lectureName}
                        onChange={handleLectureNameInput}
                        placeholder="강의 명"
                    />
                    <button
                        onClick={handleSearchButton}
                    >
                    검색
                    </button>
                </form>
                <br />
                <form id="lecture-search-form">
                    <span>강의 추가</span>
                    <input
                        type="text"
                        value={addLanguage}
                        onChange={handleAddLanguageInput}
                        placeholder="언어(C, JAVA)"
                    />
                    <input
                        type="text"
                        value={addDifficulty}
                        onChange={handleAddDifficultyInput}
                        placeholder="난이도(1, 2, 3)"
                    />
                    <input
                        type="text"
                        value={addLectureKind}
                        onChange={handleAddLectureKindInput}
                        placeholder="강의 종류"
                    />
                    <input
                        type="text"
                        value={addPricing}
                        onChange={handleAddPricingInput}
                        placeholder="가격"
                    />
                    <input
                        type="text"
                        value={addLectureName}
                        onChange={handleAddLectureNameInput}
                        placeholder="강의 명"
                    />
                    <input
                        type="text"
                        value={addMaterialUrl}
                        onChange={handleAddMaterialUrlInput}
                        placeholder="강의 주소"
                    />
                    <input
                        type="text"
                        value={addImgUrl}
                        onChange={handleAddImgUrlInput}
                        placeholder="강의 이미지"
                    />
                    <input
                        type="text"
                        value={addLectureDescription}
                        onChange={handleAddLectureDescriptionInput}
                        placeholder="강의 설명"
                    />
                    <button
                        onClick={handleAddLectureButton}
                    >
                    추가
                    </button>
                </form>
                <div className="lectures">
                    {
                    lectureData.map((lecture, i) => {
                        return (
                            <div className="lectureStyle" key={i}>
                                <Lecture lecture={lecture} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <button><Link to="/mycurri">내 커리큘럼 보러가기</Link></button>
        </div>
    );
}

