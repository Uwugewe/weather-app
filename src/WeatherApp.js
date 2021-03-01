import React, {Component} from 'react';
import WeatherAppList from './WeatherAppList';

import axios from 'axios';


class WeatherApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiArr: [],
            IDObjects: []
        }
    }

    componentDidMount() {
        this.getWeatherData();
    }

    getCitiesID() {

        axios.get('./city.list.json')
        .then( res => {
            let IDObjects = res.data;
            return(IDObjects)
        })
    }

    getWeatherData() {

        axios.get('http://api.openweathermap.org/data/2.5/forecast?id=2172797&appid=9ceb925d46b75ee1c3f57b6bfec0c2aa')
        .then( res => {

            let newWeatherObj = {
                city: res.data.city.name,
                conditions: res.data.list
            }

            console.log(newWeatherObj);

            this.setState((state) => {
                return(
                    state.apiArr.push(res.data)
                )
            })
        });
    }



    render() {
        return(
            <div>
                <h1>Weather App</h1>
                <input type='text' ref={(element) => {this._input = element;}} placeholder='Search city' onChange={this.getCitiesID}/>
                <WeatherAppList CityWeather={this.state.apiArr}/>
            </div>
        )
    }
}

export default WeatherApp;