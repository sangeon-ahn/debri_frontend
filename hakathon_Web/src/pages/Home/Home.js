import React from "react";
import Header from "../Header/Header";
import "./Home.css";

export default function Home() {
    // const userdata = JSON.parse(localStorage.getItem('userIndex'));

    return (
        <div className="home">
            <Header />
            {/* <div>
                email: {userdata[0].email}<br />
                nickname:{userdata[0].nickname}
            </div> */}
        </div>
    );
}

