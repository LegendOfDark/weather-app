import React from 'react';
import './Future.css'
import moment from 'moment';

function Hourly(props) {
    const data = props.hourlyData[props.id]

  let date = moment((data.dt + props.timezoneOffset) * 1000);
  date = date.utc().format('h A');

  if (props.id === 0) date = "NOW"


    return (
        <div className="cover">
            <h2 className="time">{date}</h2>
            <img draggable="false" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="" className="icon" />
            <p className="temp">{data.temp}<span> &#8451;</span></p>
        </div>
    )
}

export default Hourly;
