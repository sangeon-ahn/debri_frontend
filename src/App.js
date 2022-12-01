import React, { Component, useEffect }  from 'react';
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Account from "./pages/Account/Account";
import EmailAuth from "./pages/Account/EmailAuth";
import BoardsPage from "./pages/BoardsPage/BoardsPage";
import LoginPage from './pages/LoginPage/LoginPage';
import Board from './pages/BoardPage/Board';
import ScrapPostsList from "./pages/BoardPage/ScrapPostsList";
import PostWritePage from "./pages/PostWritePage/PostWritePage";
import BeginPage from "./pages/BeginPage/BeginPage";
import LowBar from "./pages/LowBar/LowBar";
import Header from "./pages/Header/Header";
import PostPage from "./pages/PostPage/PostPage";
import PostModifyPage from "./pages/PostModifyPage/PostModifyPage";
import LecturesPage from "./pages/LecturesPage/LecturesPage";
import LectureDetailPage from "./pages/LecturesPage/LectureDetailPage";
import CurriculumPage from "./pages/CurriculumPage/CurriculumPage";
import BeginChooseCurrPage from './pages/BeginChooseCurrPage/BeginChooseCurrPage';
import BeginNewRoadmapPage from './pages/BeginNewRoadmapPage/BeginNewRoadmapPage';
import { RecoilRoot } from 'recoil';
import CreateCurriPage from './pages/CreateCurriPage/CreateCurriPage';
import AddLectureToCurri from './pages/LecturesPage/AddLectureToCurriPage';
import MyPage from "./pages/MyPage/MyPage";
import CurriculumTabPage from './pages/CurriculumTabPage/CurriculumTabPage';
import RecoCurri from './pages/CurriculumTabPage/RecoCurri';

function App() {
  return (
    <>
    <RecoilRoot>
      <HashRouter>
        <LowBar />
        <div>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/emailAuth' element={<EmailAuth />} />
            <Route path='/account' element={<Account />} />
            <Route path="/home" element={<BeginPage />} />
            <Route path="/home/beginCurri" element={<BeginChooseCurrPage />} />
            <Route path="/lectures" element={<LecturesPage />} />
            <Route path="/lectures/detail/:lectureIdx" element={<LectureDetailPage />} />
            <Route path="/curriculum/:curriIdx/:lectureIdx" element={<LectureDetailPage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:boardId" element={<Board />} />
            <Route path="/boards/:boardId/:postId" element={<PostPage />} />
            <Route path="/boards/:boardId/:postId/modify" element={<PostModifyPage />} />
            <Route path="/boards/:boardId/postwrite" element={<PostWritePage />} />
            <Route path="/curriculum/:curriIdx" element={<CurriculumPage />} />
            <Route path="/scrapPostsList" element={<ScrapPostsList />} />
            <Route path='/roadmaps' element={<BeginNewRoadmapPage />} />
            <Route path='/createCurri' element={<CreateCurriPage />} />
            <Route path='/addLectureToCurri' element={<AddLectureToCurri />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/curriculum' element={<CurriculumTabPage />} />
            <Route path='/recoCurri' element={<RecoCurri />} />
          </Routes>
        </div>
      </HashRouter>
    </RecoilRoot>
    </>
  );
}

export default App;
