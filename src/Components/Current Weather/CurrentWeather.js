import './CurrentWeather.css';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';

function CurrentWeather(props) {
  let date = moment((props.currentData.dt + props.timezoneOffset) * 1000);
  date = date.format('dddd, MMMM Do');


  let sunset = moment((props.currentData.sunset + props.timezoneOffset) * 1000);

  sunset = sunset.utc().format('h:mm a')




  //const city = caps(props.city)
  const [textField, setTextField] = useState(true);
  const [city, setCity] = useState(props.city);
  const previousCity = props.city;

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };
  return (
    <div className="box">
      <div className='current'>
        <div className="current-left">
          <div className="inline-title">
            <Input
              id="outlined-read-only-input"
              className="current--city"
              variant="standard"
              value={city}
              inputProps={{
                readOnly: textField,
              }}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle edit field"
                    onClick={() => setTextField(!textField)}
                    edge="end"
                    className="editIcon"
                  >
                    {textField ? <EditIcon fontSize="large" color="success" />
                      : <CloudDoneIcon fontSize="large" onClick={() => {
                        if (previousCity !== city) { props.updateCity(city); }
                      }} />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {/* {textField ? <EditIcon className="editIcon" fontSize="large" color="success" onClick={() => setTextField(!textField)} />
          :
          <CloudDoneIcon className="editIcon" fontSize="large" onClick={() => {props.updateCity(city);setTextField(!textField)}}/> }*/}


          </div>
          <h2 className='current--date'>{date}</h2>
          <img src={`http://openweathermap.org/img/wn/${props.currentData.weather[0].icon}@4x.png`} alt="" className='current--img' />
          <h2 className="current--weather">{caps(props.currentData.weather[0].description)}</h2>
        </div>
        <div className="current-right">
          <h1 className="current--temp">{props.currentData.temp}<span> &#8451;</span></h1>
          <h3 className="current--feelsLike">Feels Like: {props.currentData.feels_like}<span> &#8451;</span></h3>
          <div className="current-sunset-flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="current--sunset-icon" viewBox="0 0 16 16">
              <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7zm3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
            </svg>
            <p className="current--sunset">{sunset}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function caps(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default CurrentWeather;
