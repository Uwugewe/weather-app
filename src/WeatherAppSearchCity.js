import React, {Component} from 'react';
import DisplaySelectedCity from './DisplayWeatherSelected';

import axios from 'axios';

class WeatherAppList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedID: '',
            cityName: '',
            weatherConditions: {},
            weatherConditions2: []
        }
    }

    getWeatherData = () => {

        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${this.state.selectedID}&appid=9ceb925d46b75ee1c3f57b6bfec0c2aa`)
        .then( res => {
            console.log(res);
            
            this.setState(state => {
                return({cityName: res.data.city.name})
            })
            for (let obj of res.data.list){
                
                this.setState(state => {
                    return(state.weatherConditions2.push(obj))
                })
            }
            
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

        let offers = this.props.Filtered.map((offerObj) => {

            let ShowCityLi = '';
            if(!offerObj.state) {
                ShowCityLi = 
                    (<li key={offerObj.id}>
                        {offerObj.name} ({offerObj.country})<button onClick={() => {
                            this.setState((state) => {
                                return({selectedID: offerObj.id})
                            });
                            this.props.RemoveFindView();
                            this.props.HideInput();
                            setTimeout(this.getWeatherData, 0);
                        }}>Select</button>
                    </li>);
            } else {
                ShowCityLi = 
                    (<li key={offerObj.id}>
                        {offerObj.name} ({offerObj.country}) State: {offerObj.state} <button onClick={() => {
                            this.setState((state) => {
                                return({selectedID: offerObj.id})
                            });
                            this.props.RemoveFindView();
                            this.props.HideInput();
                            setTimeout(this.getWeatherData, 0);
                        }}>Select</button>
                    </li>);
            }
            return(ShowCityLi)
        });

        let showWeather = '';

        if(this.state.weatherConditions.hasOwnProperty('City: ')){
            showWeather = (
                <div>
                    <button className='back-button' onClick={() => {
                        this.clearCurrentConditions();
                        this.props.HideInput();
                    }}>X</button>
                    <DisplaySelectedCity DisplayWeather={this.state.weatherConditions}
                    DisplayWeatherArr={this.state.weatherConditions2} SelectedCityName={this.state.cityName}/>
                </div>
            )
        }
    
        return(
            <div>
                {offers}
                {showWeather}
            </div>
        )
    }
}


export default WeatherAppList