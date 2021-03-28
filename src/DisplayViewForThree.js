import React from 'react';

function DisplayViewForThree(props) {

        let displayForTheeDays = '';
        let displayOneDay = '';

        displayForTheeDays = Object.entries(props).map(value => {
            let hour = '';
            let temp = '';
            let description = '';
            let imgSrc = '';
            let day = value[1][0].dt_txt.substr(0,10);

            displayOneDay = value[1].map(underValue => {
                imgSrc = `http://openweathermap.org/img/wn/${underValue.weather[0].icon}@2x.png`;
                hour = underValue.dt_txt.substr(11);
                temp = (underValue.main.temp - 273.15).toFixed(2);
                description = underValue.weather[0].description;

                return(
                    <div className='BOX-ViewForOne'>
                        <p>{hour}</p>
                        <h2>{temp} °C</h2>
                        <p>{description}</p>
                        <img src={imgSrc}/>
                    </div>
                )
                
            });
            return(
                <div>
                    <h2>{day}</h2>
                    <div className='ViewWeatherForOne'>
                        {displayOneDay}
                    </div>
                </div>
            )
        
        });

        return(
        <div>{displayForTheeDays}</div>
        )
}

export default DisplayViewForThree;