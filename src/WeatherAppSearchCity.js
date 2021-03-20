import React, {Component} from 'react';
import ChangeDaysInterval from './ChangeDaysInterval';

import axios from 'axios';

class WeatherAppList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedID: '',
            cityProperties: {},
            weatherConditions: []
        }
    }

    getWeatherData = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${this.state.selectedID}&appid=9ceb925d46b75ee1c3f57b6bfec0c2aa`)
        .then( res => {
            this.setState(state => {
                return({
                    cityProperties: {
                        name: res.data.city.name,
                        cityCountry: res.data.city.country
                    }
                })
            });
            for (let obj of res.data.list){  
                this.setState(state => {
                    return(state.weatherConditions.push(obj))
                })
            }
        });
    }

    clearCurrentConditions = () => {
        this.setState(state => {
            return({weatherConditions: [],
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

        if(this.state.weatherConditions.length !== 0){
            showWeather = (
                <div>
                    <button className='back-button' onClick={() => {
                        this.clearCurrentConditions();
                        this.props.HideInput();
                    }}>X</button>
                    <ChangeDaysInterval DisplayWeatherArr={this.state.weatherConditions} CityProperties={this.state.cityProperties}/>
                </div>
            )
        }
    
        return(
            <div className='searchCity'>
                {offers}
                {showWeather}
            </div>
        )
    }
}

export default WeatherAppList