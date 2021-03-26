import React, {Component} from 'react';
import './DisplaySelectedInterval.css';

class DisplayViewForNow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherConditionsNow: {
                whichDay: '',
                icon: '',
                conditions: {}
            }
        }
    }

    componentDidMount(){
        this.setStateForNow();
    }

    setStateForNow = () => {
        this.setState((state)=> {
            console.log(state);
            return({weatherConditionsNow: {
                whichDay: this.props.Day.dt_txt,
                icon: `http://openweathermap.org/img/wn/${this.props.Day.weather[0].icon}@2x.png`,
                description: this.props.Day.weather[0].description,
                conditions: {
                    'Temperature: ': Math.round(this.props.Day.main.temp - 273.15 ).toFixed(2) + ' °C',
                    'Perceptible temperature: ': (this.props.Day.main.feels_like - 273.15).toFixed(2) + ' °C',
                    'Pressure: ': this.props.Day.main.pressure + ' hPa',
                    'Humidity: ': this.props.Day.main.humidity + ' %'
                    }
                }
            })
        });  
    }

    render() {
    
        let displayWeatherNow = '';
        let icon = '';
        let description = '';

        icon = <img src={this.state.weatherConditionsNow.icon}/>;
        description = <p className='Description'>{this.state.weatherConditionsNow.description}</p>;
        
        displayWeatherNow = Object.entries(this.state.weatherConditionsNow.conditions).map((value, label) => {
            if(value[0] === 'Temperature: '){
                return(<p key={label}><h2>{value[1]}</h2></p>)
            };
            return(<p key={label}>{value}</p>)
        });

        return(
            <div>
                <h2>{(this.state.weatherConditionsNow.whichDay).substr(0,10)}</h2>
                {icon}
                {description}
                {displayWeatherNow}
            </div>
        )
    }
}

export default DisplayViewForNow;