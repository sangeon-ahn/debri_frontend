import BoardsPage from "./pages/BoardsPage/BoardsPage";
import Board from './pages/BoardPage/Board';
import PostWritePage from "./pages/PostWritePage/PostWritePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LowBar from "./pages/LowBar/LowBar";
import Header from "./pages/Header/Header";
import PostPage from "./pages/PostPage/PostPage";
import PostModifyPage from "./pages/PostModifyPage/PostModifyPage";
import LecturePage from "./pages/LecturePage/LecturePage";
import CurriculumPage from "./pages/CurriculumPage/CurriculumPage";

function App() {
  localStorage.setItem("userIdx", 2);
  localStorage.setItem("jwt", "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4IjoyLCJpYXQiOjE2NTg4MzMxMTcsImV4cCI6NTk3MTc5OTIyNDA2OTIwMH0.9x_GVpPVxJhBl3pdNB93uEaJEMUDbH2_rV_Rsz5fLRw");
  localStorage.setItem("refreshToken", "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTgxMDU0NTQsImV4cCI6LTQzMTM2NDEzNTExMTY0MTJ9.N2YGiJm8YOP1QRCNIcD-lS-QW23di5Yp3CJgg5w7Gpo");
  localStorage.setItem("nickname", "nickname1");
  
  return (
    <BrowserRouter>
    {/* {logined && <Header />} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lectures" element={<LecturePage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/boards/:boardId/:postId" element={<PostPage />} />
        <Route path="/boards/:boardId/:postId/modify" element={<PostModifyPage />} />
        <Route path="/boards/:boardId/postwrite" element={<PostWritePage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
      </Routes>
      {/* {logined && <LowBar /> } */}
      <LowBar />
    </BrowserRouter>
  );
}

export default App;
