import React, { Component }  from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import Account from "./pages/Account/Account";
import BoardsPage from "./pages/BoardsPage/BoardsPage";
import Login from './pages/Login/Login';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="board" element={<BoardsPage />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

