import React from 'react';
import './DisplayViewForOne.css';

function DisplayViewForOne(props) {

    let displayDemo = '';
    let imgSrc = '';

    displayDemo = props.Day.map((value, key) => {
        imgSrc = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`

        return (
            <div key={key} className='BOX-ViewForOne'>
                <p>{(value.dt_txt).substr(11)}</p>
                <h2>{(value.main.temp - 273.15).toFixed(2)} °C</h2>
                <p className='Description'>{value.weather[0].description}</p>
                <img src={imgSrc} />
            </div>
        )
    });

    return (
        <div>
            <h2>{(props.Day[0].dt_txt).substr(0, 10)}</h2>
            <div className='ViewWeatherForOne'>
                <div className='ScrollContainer'>
                    {displayDemo}
                </div>
            </div>
        </div>
    )

}

export default DisplayViewForOne;