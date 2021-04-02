import React from 'react';
import './DisplayViewForNow.css';

function DisplayViewForNow(props) {

    let imgSrc = `http://openweathermap.org/img/wn/${props.Day.weather[0].icon}@2x.png`;

    return (
        <div>
            <h2>{props.Day.dt_txt.substr(0, 10)}</h2>
            <img src={imgSrc} />
            <p className='Description'>{props.Day.weather[0].description}</p>
            <h2>Temperature: {(props.Day.main.temp - 273.15).toFixed(2)} °C</h2>
            <p>Perticible temperature: {(props.Day.main.feels_like - 273.15).toFixed(2)} °C</p>
            <p>Pressure: {props.Day.main.pressure} hPa</p>
            <p>Humidity: {props.Day.main.humidity} %</p>
        </div>
    )

}

export default DisplayViewForNow;