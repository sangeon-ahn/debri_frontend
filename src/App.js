import React, { Component }  from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import Account from "./pages/Account/Account";
import BoardsPage from "./pages/BoardsPage/BoardsPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Account />} />
          <Route path="board" element={<BoardsPage />} />        
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

