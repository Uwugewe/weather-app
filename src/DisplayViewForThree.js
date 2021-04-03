import React, { Component } from 'react';
import './DisplayViewForThree.css';

class DisplayViewForThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayNr: 1
        };
    }

    render() {

        let displayOneDay = '';

        let hour = '';
        let temp = '';
        let description = '';
        let imgSrc = '';
        let whichDay = '';

        if (this.state.dayNr === 1) {
            whichDay =  this.props.Day1[0].dt_txt.substr(0,10);
            displayOneDay = this.props.Day1.map((value, key) => {
                imgSrc = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;
                hour = value.dt_txt.substr(11);
                temp = (value.main.temp - 273.15).toFixed(2);
                description = value.weather[0].description;

                return (
                    <div key={key} className='BOX-ViewForOne'>
                        <p>{hour}</p>
                        <h2>{temp} °C</h2>
                        <p className='Description'>{description}</p>
                        <img src={imgSrc} />
                    </div>
                )
            });
        } else if (this.state.dayNr === 2) {
            whichDay =  this.props.Day2[0].dt_txt.substr(0,10);
            displayOneDay = this.props.Day2.map((value, key) => {
                imgSrc = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;
                hour = value.dt_txt.substr(11);
                temp = (value.main.temp - 273.15).toFixed(2);
                description = value.weather[0].description;

                return (
                    <div key={key} className='BOX-ViewForOne'>
                        <p>{hour}</p>
                        <h2>{temp} °C</h2>
                        <p className='Description'>{description}</p>
                        <img src={imgSrc} />
                    </div>
                )
            });
        } else if (this.state.dayNr === 3) {
            whichDay =  this.props.Day3[0].dt_txt.substr(0,10);
            displayOneDay = this.props.Day3.map((value, key) => {
                imgSrc = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;
                hour = value.dt_txt.substr(11);
                temp = (value.main.temp - 273.15).toFixed(2);
                description = value.weather[0].description;

                return (
                    <div key={key} className='BOX-ViewForOne'>
                        <p>{hour}</p>
                        <h2>{temp} °C</h2>
                        <p className='Description'>{description}</p>
                        <img src={imgSrc} />
                    </div>
                )
            });
        }

        return (
            <div>
                <div className='ChangeForThreeDaysRow'>
                    <button className='skipDay' onClick={() => {
                        if (this.state.dayNr !== 1) {
                            this.setState(state => {
                                return ({ dayNr: state.dayNr - 1 })
                            });
                        }
                    }}>prev</button><h2>{whichDay}</h2><button className='skipDay' onClick={() => {
                        if (this.state.dayNr !== 3) {
                            this.setState(state => {
                                return ({ dayNr: state.dayNr + 1 })
                            });
                        }
                    }}>next</button></div>

                <div className='ViewWeatherForOne'>
                    <div className='ScrollContainer'>
                        {displayOneDay}
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayViewForThree;