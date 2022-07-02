import React, { useState } from "react";
import Clock from 'react-live-clock';
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';
import Header from "../Header/Header";

function Timetable() {
  const [user, setUser] = useRecoilState(userId);

  return (
    <div>
      <Header />
      <h2>유저 아이디 {user}님 반갑습니다.</h2>
      <Clock format={'YYYY년 MM월 DD일 HH:mm:ss'} ticking={true}/>
      {/* {timetable.map((item, i) => (
        <div key={item.id} >            
          <h3>{item.title}</h3>
          {item.date.map((todate) => (
            <div key={todate.id}>
              <div>{todate.day}</div>
              <div>{todate.starttime}</div>
              <div>{todate.endtime}</div>
            </div>
          ))}
          <div>{item.location}</div>
          <div>{item.info}</div>
          {item.tags.map((tag) => (
            <div key={tag.id}>
              <div>{tag.name}</div>
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
}
export default Timetable;
