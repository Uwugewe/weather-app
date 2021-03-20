import React, {Component} from 'react';
import './DisplaySelectedInterval.css';

class DisplaySelectedInterval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherConditionsNow: {

            },
            weatherConditionsOneDay: {
                hours: [],
                temperatures: []
            },
            weatherConditionsThreeDays: {
                hours: [],
                temperatures: []
            }
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setStateForNow();
            this.setStateForOneDay();
            this.setStateForThreeDays();
        },500);
    }

    setStateForNow = () => {
        this.setState((state)=> {
            return({
                weatherConditionsNow: {
                    'Perceptible temperature: ': (this.props.Days.day1[0].main.feels_like - 273.15).toFixed(2) + ' °C',
                    'Temperature: ': Math.round(this.props.Days.day1[0].main.temp - 273.15 ).toFixed(2) + ' °C',
                    'Pressure: ': this.props.Days.day1[0].main.pressure + ' hPa',
                    'Humidity: ': this.props.Days.day1[0].main.humidity + ' %'
                }
            })
        });   
    }

    setStateForOneDay = () => {
        this.props.Days.day1.map(value => {
            this.setState(state => {
                return(
                    state.weatherConditionsOneDay.temperatures.push((value.main.temp - 273.15).toFixed(2) + ' °C')
                )
            });
        });
        this.props.Days.day1.map(value => {
            this.setState(state => {
                return(
                    state.weatherConditionsOneDay.hours.push(value.dt_txt)
                )
            });
        });
    }

    setStateForThreeDays = () => {
        for(let i = 0; i <= 3; i++) {
            this.setState(state => {
                return(
                    state.weatherConditionsThreeDays.hours.push(this.props.Days.day1[i].dt_txt)
                )
            });
        }
    }

    render() {
    
        let displayWeatherNow = '';
        let displayHours = '';
        let displayTemperaturesForHours = '';

        if(this.props.Interval === 'now'){
            displayWeatherNow = Object.entries(this.state.weatherConditionsNow).map((value, label) => {
                return(<li key={label}>{value}</li>)
            })
        } else if(this.props.Interval === 'one'){
            displayHours = this.state.weatherConditionsOneDay.hours.map((value,index) => {
                return (
                    <p key={index}>{value}</p>
                )
            });
            displayTemperaturesForHours = this.state.weatherConditionsOneDay.temperatures.map((value,index) => {
                return(
                    <p key={index}>{value}</p>
                )
            });
        } else if(this.props.Interval === 'three'){
            
        }

        return (
            <div>
                {displayWeatherNow}
                <div className='viewWeather'>
                    <div className='hours'>{displayHours}</div>
                    <div className='temperatures'>{displayTemperaturesForHours}</div>
                </div>
            </div>
            )
    }
}

export default DisplaySelectedInterval