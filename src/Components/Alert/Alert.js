import React from 'react';
import './Alert.css'
import moment from 'moment';
import WarningIcon from '@mui/icons-material/Warning';


function Alert(props) {

    const alert = props.alerts[props.id]


    let date = moment((alert.start + props.timezoneOffset) * 1000);
    date = date.utc().format('MMMM Do [at] h:mm:ss a');

    return(
    <div className="alert">
      <div className="inline-flex">
        <WarningIcon fontSize="large" sx={{display: "inline-block"}} />
        <h2 className="alert-title" style={{display:"inline"}}>A warning from {alert.sender_name}</h2>
      </div>
      <p className="alert-description">{alert.description}</p>
      <h3 className="alert-time">Issued at {date}</h3>
    </div>
  );
}

export default Alert;
