// import React, {Component} from 'react';
// import './DisplaySelectedInterval.css';

class DisplaySelectedInterval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherConditionsNow: {
                icon: '',
                conditions: {}
            },
            weatherConditionsOneDay: {
                hours: [],
                temperatures: []
            },
            weatherConditionOneDayDemo: {

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
            console.log(state);
            return({weatherConditionsNow: {
                icon: `http://openweathermap.org/img/wn/${this.props.Days.day1[0].weather[0].icon}@2x.png`,
                description: this.props.Days.day1[0].weather[0].description,
                conditions: {
                    'Temperature: ': Math.round(this.props.Days.day1[0].main.temp - 273.15 ).toFixed(2) + ' °C',
                    'Perceptible temperature: ': (this.props.Days.day1[0].main.feels_like - 273.15).toFixed(2) + ' °C',
                    'Pressure: ': this.props.Days.day1[0].main.pressure + ' hPa',
                    'Humidity: ': this.props.Days.day1[0].main.humidity + ' %'
                    }
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

        this.props.Days.day1.forEach(value => {
            console.log(value);
            console.log(value.dt_txt);
            this.state.weatherConditionOneDayDemo[value.dt_txt] = (value.main.temp - 273.15).toFixed(2);
        });
    }

    setStateForThreeDays = () => {
        let i = 0;
        for (let [key, value] of Object.entries(this.props.Days)){
            i += 1;
            if(i >= 2 && i <= 4 ) {
                value.forEach(underValue => {
                    this.setState(state => {
                        return(
                            state.weatherConditionsThreeDays.hours.push(underValue.dt_txt),
                            state.weatherConditionsThreeDays.temperatures.push((underValue.main.temp - 273.15).toFixed(2))
                        )
                    });
                });
            }
        }
    }

    render() {
    
        let displayWeatherNow = '';
        let displayHours = '';
        let displayTemperaturesForHours = '';
        let icon = '';
        let description = '';

        if(this.props.Interval === 'now'){
            icon = <img src={this.state.weatherConditionsNow.icon}/>;
            description = <p className='Description'>{this.state.weatherConditionsNow.description}</p>;
            displayWeatherNow = Object.entries(this.state.weatherConditionsNow.conditions).map((value, label) => {
                if(value[0] === 'Temperature: '){
                    return(<p key={label}><h2>{value[1]}</h2></p>)
                }
                return(<p key={label}>{value}</p>)
            });

            return(
                <div>
                    {icon}
                    {description}
                    {displayWeatherNow}
                </div>
            )
            
        } else if(this.props.Interval === 'one'){

            displayHours = this.state.weatherConditionsOneDay.hours.map((value,index) => {
                return (
                    <span key={index}>{value.substr(10)}</span>
                )
            });
            displayTemperaturesForHours = this.state.weatherConditionsOneDay.temperatures.map((value,index) => {
                return(
                    <p key={index}>{value}</p>
                )
            });

            return (
                <div>
                    <div className='ViewWeatherForOne'>
                        <div className='Hours'>{displayHours}</div>
                        {/* <div className='Temperatures'>{displayTemperaturesForHours}</div> */}
                    </div>
                </div>
            )

        } else if(this.props.Interval === 'three'){
            displayHours = this.state.weatherConditionsThreeDays.hours.map((value, index) => {
                return (
                    <div className='hour'><p key={index}>{value}</p></div>
                )
            });
            displayTemperaturesForHours = this.state.weatherConditionsThreeDays.temperatures.map((value,index) => {
                return(
                    <div className='hour'><p key={index}>{Math.round(value)}°C</p></div>
                )
            });

            return(
                <div className='chart'>
                    <div className='temperaturesForChart'>
                        {displayTemperaturesForHours}
                    </div>
                    <div className='hoursThreeDays'>
                        {displayHours}
                    </div>
                </div>
            )
        }
        return(
            <div></div>
        )
    }
}

// export default DisplaySelectedInterval