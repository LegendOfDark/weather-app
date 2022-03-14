import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Hourly from '../Future/Hourly'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Tabs.css'
import Daily from '../Future/Daily'
import Alert from '../Alert/Alert'


// Global vars for handleClick()
let start = 0;
const limit = 8;


function Tabs(props) {
  // declaring vars and refs
  const [value, setValue] = useState('1');
  const previousRef = useRef();
  const nextRef = useRef();
  let hourlyComponenets = []
  let dailyComponents = []
  let alertComponents = []

  console.log("tab rendering rn")

  
  // function for changing slider
  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  // function for changing the hours
  const handleClick = (e) => {
    const { name } = e.target
    let newArr;
    if (name === 'next' && start !== hourlyComponenets.length) {
      newArr = hourlyComponenets.slice(start, start + limit)
      setRenderComps(newArr)
      start = start + limit
    }
    if (name === 'previous' && (start - limit) >= 0) {
      newArr = hourlyComponenets.slice(start - limit, start)
      setRenderComps(newArr)
      start = start - limit
    }

    if (start !== 0) previousRef.current.style.display = 'inline-block'
    else previousRef.current.style.display = 'none'
    if (start !== hourlyComponenets.length) nextRef.current.style.display = 'inline-block'
    else nextRef.current.style.display = 'none'
  }

  // adding hourly components
  for (let x = 0; x < props.hourlyData.length; x++) {
    hourlyComponenets.push(<Hourly key={x} id={x} timezoneOffset={props.timezoneOffset} hourlyData={props.hourlyData} />)
  }
  const [renderComps, setRenderComps] = useState(hourlyComponenets.splice(start, limit));

  // adding daily components 
  for (let y = 0; y < props.dailyData.length; y++) {
    dailyComponents.push(<Daily key={y} id={y} timezoneOffset={props.timezoneOffset} dailyData={props.dailyData} />)
  }

  // adding alert Components
  if (props.alerts !== undefined){
    for (let i = 0; i < props.alerts.length; i++) {
      alertComponents.push(<Alert key={i} id={i} timezoneOffset={props.timezoneOffset}  alerts={props.alerts} />)
    }
  }

  return (
    <Box className='menu' sx={{ width: '100%', marginTop: '2.5vh', fontFamily: "'Lato', sans-serif" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} >
              <Tab label="Hourly Temeperature" value="1" />
              <Tab label="Daily Forecast" value="2" />
              {props.alerts !== undefined && <Tab label="Weather Alerts" value="3" />}
            </TabList>
          </Box>
          <TabPanel sx={{ p: "12px" }} value="1">
            <div className="flex">{renderComps}
              <button ref={previousRef} className='btn btn-left' name="previous" style={{ display: 'none' }} onClick={handleClick}><ArrowBackIosNewIcon fontSize="large" /></button>
              <button ref={nextRef} className='btn btn-right' name="next" onClick={handleClick}><ArrowForwardIosIcon fontSize="large" /></button>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="flex">{dailyComponents}</div>
          </TabPanel>
          {props.alerts !== undefined && <TabPanel value="3">{alertComponents}</TabPanel>}
        </TabContext>
      </Box>
    </Box>
  )
}

export default Tabs;