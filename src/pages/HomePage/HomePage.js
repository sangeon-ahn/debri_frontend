import LowBar from "../LowBar/LowBar";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();

  const data = location;
  console.log(data);
  return (
    <div>
      <div>홈</div>
    </div>
  );
}