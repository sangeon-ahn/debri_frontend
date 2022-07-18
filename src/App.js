import BoardsPage from "./pages/BoardsPage/BoardsPage";
import Board from './pages/BoardPage/Board';
import PostWritePage from "./pages/PostWritePage/PostWritePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LowBar from "./pages/LowBar/LowBar";
import Header from "./pages/Header/Header";
import PostPage from "./pages/PostPage/PostPage";

function App() {

  return (
    <BrowserRouter>
    {/* {logined && <Header />} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lectures" element={<Board />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/boards/:boardId/:postId" element={<PostPage />} />
        <Route path="/postwrite" element={<PostWritePage />} />
      </Routes>
      {/* {logined && <LowBar /> } */}
      <LowBar />
    </BrowserRouter>
  );
}

export default App;
