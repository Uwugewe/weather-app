import React, {Component} from 'react';
import ChangeDaysInterval from './ChangeDaysInterval';

import axios from 'axios';
import './WeatherAppSearchCity.css';

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
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${this.state.selectedID}&appid={ENTER YOUR FREE API KEY}`)
        .then( res => {
            let joinState = [];
            
            this.setState({
                cityProperties: {
                    name: res.data.city.name,
                    cityCountry: res.data.city.country
                }
            });
            
            this.setState(() => {
                joinState = joinState.concat(res.data.list);
                return({weatherConditions: joinState})
            });
        });
    }

    clearCurrentConditions = () => {
        this.setState({weatherConditions: [], selectedID: ''});
    }
    
    render() {
        let offers = this.props.Filtered.map((offerObj) => {
            let showCityLi = '';
            if(!offerObj.state) {
                showCityLi = 
                    (<li key={offerObj.id} onClick={() => {
                        this.setState({selectedID: offerObj.id});
                        this.props.RemoveFindView();
                        this.props.HideInput();
                        setTimeout(this.getWeatherData, 0);
                    }}>
                        {offerObj.name} ({offerObj.country})
                    </li>);
            } else {
                showCityLi = 
                    (<li key={offerObj.id}>
                        {offerObj.name} ({offerObj.country}) State: {offerObj.state} <button onClick={() => {
                            this.setState({selectedID: offerObj.id});
                            this.props.RemoveFindView();
                            this.props.HideInput();
                            setTimeout(this.getWeatherData, 0);
                        }}>Select</button>
                    </li>);
            }
            return(showCityLi)
        });

        let showWeather = '';

        if(this.state.weatherConditions.length !== 0){
            showWeather = (
                <div className='DisplayInterval'>
                    <button className='BackButton' onClick={() => {
                        this.clearCurrentConditions();
                        this.props.HideInput();
                    }}>back</button>
                    <ChangeDaysInterval DisplayWeatherArr={this.state.weatherConditions} CityProperties={this.state.cityProperties}/>
                </div>
            )
        }
    
        return(
            <div>
                <div className='SelectCity'>
                    {offers}
                </div>
                {showWeather}
            </div>
        )
    }
}

export default WeatherAppList