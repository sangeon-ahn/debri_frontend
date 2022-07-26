import BoardsPage from "./pages/BoardsPage/BoardsPage";
import Board from './pages/BoardPage/Board';
import PostWritePage from "./pages/PostWritePage/PostWritePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LowBar from "./pages/LowBar/LowBar";
import Header from "./pages/Header/Header";
import PostPage from "./pages/PostPage/PostPage";
import PostModifyPage from "./pages/PostModifyPage/PostModifyPage";

function App() {
  localStorage.setItem("userIdx", 2);
  localStorage.setItem("jwt", "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4IjoyLCJpYXQiOjE2NTgxMDU0NTQsImV4cCI6NTk2OTE3OTYzNDY4ODAwMH0.TIGybn0SXq51j0pLOxRFraDgxbN2HtcFxQAQ93mKBlY");
  localStorage.setItem("refreshToken", "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTgxMDU0NTQsImV4cCI6LTQzMTM2NDEzNTExMTY0MTJ9.N2YGiJm8YOP1QRCNIcD-lS-QW23di5Yp3CJgg5w7Gpo");
  localStorage.setItem("nickname", "nickname1");
  
  return (
    <BrowserRouter>
    {/* {logined && <Header />} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lectures" element={<Board />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/boards/:boardId/:postId" element={<PostPage />} />
        <Route path="/boards/:boardId/:postId/modify" element={<PostModifyPage />} />
        <Route path="/postwrite" element={<PostWritePage />} />
      </Routes>
      {/* {logined && <LowBar /> } */}
      <LowBar />
    </BrowserRouter>
  );
}

export default App;
