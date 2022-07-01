import React from "react";
import Header from "../Header/Header";

export default function Home() {
    const userdata = JSON.parse(localStorage.getItem('userData'));

    return (
        <div>
            <Header />
            <div>
                <div>
                    <div>
                        email: {userdata[0].email}<br />
                        nickname:{userdata[0].nickname}
                    </div>
                </div>
            </div>
        </div>
    );
}

