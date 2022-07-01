import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Account from "./pages/Account/Account";
import Timetable from "./pages/Timetable/Timetable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="account" element={<Account />} />
        <Route path="timetable" element={<Timetable />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
