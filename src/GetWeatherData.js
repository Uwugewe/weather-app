import React, {Component} from 'react';
import axios from 'axios';
import DisplaySelectedCity from './DisplayWeatherSelected';

class GetWeatherData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherConditions: {}
        }
    }

    getWeatherData = () => {

        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${this.props.SelectedID}&appid=9ceb925d46b75ee1c3f57b6bfec0c2aa`)
        .then( res => {
            console.log(res);
            this.setState((state)=> {

                return({
                    weatherConditions: {
                        'City: ': res.data.city.name,
                        'Perceptible temperature: ': (res.data.list[0].main.feels_like - 273.15).toFixed(2) + ' °C',
                        'Temperature: ': Math.round(res.data.list[0].main.temp - 273.15 ).toFixed(2) + ' °C',
                        'Pressure: ': res.data.list[0].main.pressure + ' hPa',
                        'Humidity: ': res.data.list[0].main.humidity + ' %',
                        'Country: ': res.data.city.country
                    }
                })
            });
        });
    }

    clearCurrentConditions = () => {
        this.setState(state => {
            return({weatherConditions: {},
                selectedID: ''})
        });
    }

    render() {

        let showWeather = '';

        // if(this.state.weatherConditions.hasOwnProperty('City: ')){
        //     showWeather = (
        //         <div>
        //             <button className='back-button' onClick={() => {
        //                 this.clearCurrentConditions();
        //                 this.props.HideInput();
        //             }}>X</button>
        //             <DisplaySelectedCity DisplayWeather={this.state.weatherConditions}/>
        //         </div>
        //     )
        // }

        return(
            // {showWeather}
            <h1>HELLO WORD</h1>
        )
    }

}

export default GetWeatherData;