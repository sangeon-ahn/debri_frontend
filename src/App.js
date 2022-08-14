import React, { Component, useEffect }  from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Account from "./pages/Account/Account";
import BoardsPage from "./pages/BoardsPage/BoardsPage";
import LoginPage from './pages/LoginPage/LoginPage';
import Board from './pages/BoardPage/Board';
import ScrapPostsList from "./pages/BoardPage/ScrapPostsList";
import PostWritePage from "./pages/PostWritePage/PostWritePage";
import HomePage from "./pages/HomePage/HomePage";
import LowBar from "./pages/LowBar/LowBar";
import Header from "./pages/Header/Header";
import PostPage from "./pages/PostPage/PostPage";
import PostModifyPage from "./pages/PostModifyPage/PostModifyPage";
import LecturesPage from "./pages/LecturesPage/LecturesPage";
import CurriculumPage from "./pages/CurriculumPage/CurriculumPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/account' element={<Account />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/lectures" element={<LecturesPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards/:boardId" element={<Board />} />
          <Route path="/boards/:boardId/:postId" element={<PostPage />} />
          <Route path="/boards/:boardId/:postId/modify" element={<PostModifyPage />} />
          <Route path="/boards/:boardId/postwrite" element={<PostWritePage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/scrapPostsList" element={<ScrapPostsList />} />
        </Routes>
        <LowBar />
      </BrowserRouter>
    </>
  );
}

export default App;
