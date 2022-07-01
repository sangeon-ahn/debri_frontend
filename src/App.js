import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import TimeLine from "./pages/TimeLine/TimeLine";
import Menu from "./pages/Menu/Menu";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchLecture from "./pages/SearchLecture/SearchLecture";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="timeline" element={<TimeLine />} />
        <Route path="search" element={<SearchLecture />} />
        <Route path="menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
