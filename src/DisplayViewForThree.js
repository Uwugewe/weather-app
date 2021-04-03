import React from 'react';
import './DisplayViewForThree.css';

function DisplayViewForThree(props) {

        let displayForTheeDays = '';
        let displayOneDay = '';
        let displayDayALT = '';

        let DayNr = 1;

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
                        <p className='Description'>{description}</p>
                        <img src={imgSrc}/>
                    </div>
                )
                
            });
            if (DayNr === 1){
                displayDayALT = props.Day1.map(value => {
                    console.log(value);
                });
            }

            return(
                <div>
                    <div className='ChangeForThreeDaysRow'>
                        <button onClick={() => {
                            if (DayNr !== 1) {
                                DayNr--;
                            }
                            console.log(DayNr);
                        }}>prev</button><h2>{day}</h2><button onClick={() => {
                            if (DayNr !==3) {
                                DayNr++;
                            }
                            console.log(DayNr);
                        }}>next</button></div>

                        <div className='ViewWeatherForOne'>
                            <div className='ScrollContainer'>
                                {displayOneDay}
                            </div>
                        </div>
                </div>
            )
        
        });

        return(
        <div>{displayForTheeDays}</div>
        )
}

export default DisplayViewForThree;