import BoardsPage from "./pages/BoardsPage/BoardsPage";
import Board from './pages/BoardPage/Board';
import PostWritePage from "./pages/PostWritePage/PostWritePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostWriteCancelModal from "./pages/PostWritePage/PostWriteCancelModal/PostWriteCancelModal";
import PostWriteConfirmModal from "./pages/PostWritePage/PostWriteConfirmModal/PostWriteConfirmModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/postwrite" element={<PostWritePage />} />
        <Route path="lectures" element={<PostWriteCancelModal />} />
      </Routes>
    </BrowserRouter>
    // <PostWriteCancelModal />
  );
}

export default App;
