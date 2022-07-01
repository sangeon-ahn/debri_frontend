import React from "react";
import { Link } from 'react-router-dom';
import SearchLecture from '../SearchLecture/SearchLecture';

export default function Home() {
    const userdata = JSON.parse(localStorage.getItem('userData'));

    return (
        <div>
            <div>
                <div>
                    email: {userdata[0].email}<br />
                    nickname:{userdata[0].nickname}
                </div>
            </div>
            <SearchLecture />
        </div>
    );
}

