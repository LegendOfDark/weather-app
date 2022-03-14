import React from 'react';
import moment from 'moment';
import './Future.css'

function Daily(props) {

    const data = props.dailyData[props.id]
    let date = moment((data.dt + props.timezoneOffset) * 1000);
    date = date.utc().format('dddd');

    if (props.id === 0) date = "Today"

    // console.log(data)

    return (
      <div className="cover">
          <h2 className="time">{date}</h2>
          <img draggable="false" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="" className="icon" />
          <p className="temp">{data.temp.day}<span> &#8451;</span></p>
      </div>
  )
}

export default Daily;
