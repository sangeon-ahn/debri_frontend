import React, { useState } from "react";
import Clock from 'react-live-clock';


const timetable = [
  {
    useid : 1,
    lectureid: 1,
    title: "SQL study",
    date: [
      {
        day : "월",
        starttime : "11:00",
        endtime : "14:00"
      },
      {
        day : "금",
        starttime : "11:00",
        endtime : "14:00"
      }
    ],
    location : "랩실",
    info : "서버 화이팅",
    tags: [{
      id : 1,
      tagname : "sql"
    }]
  }, 
  {
    useid : 1,
    lectureid: 2,
    title: "Ruby on Rails 강의",
    date: [
      {
        id:1,
        day : "월",
        starttime : "14:00",
        endtime : "16:00"
      },
      {
        
        id: 2,
        day : "금",
        starttime : "14:00",
        endtime : "16:00"
      }
    ],
    location : "대양홀",
    info : "강의 지루해",
    tags : [
      {
        id : 2,
        tagname : "Ruby"
      },
      {
        id : 3,
        tagname : "JS"
      },
      {
        id : 4,
        tagname : "HTML"
      }
    ]
  },
];

function Timetable() {

  return (
    <div>
      <Clock format={'YYYY년 MM월 DD일 HH:mm:ss'} ticking={true}/>
      {timetable.map((item, i) => (
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
      ))}
    </div>
  );
}
export default Timetable;
