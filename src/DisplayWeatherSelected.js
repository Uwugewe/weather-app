import React from 'react';

function DisplaySelectedCity(props) {
    let WeatherObj = props.DisplayWeather;

    let displayWeather = Object.entries(WeatherObj).map((value, label) => {
        return(
            <li key={label}>{value}</li>
        )
    })
    
    return(
        <div>
            {displayWeather}
        </div>
    )

}

export default DisplaySelectedCity;
