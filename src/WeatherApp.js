import React, {Component} from 'react';
import WeatherAppList from './WeatherAppList';


import axios from 'axios';

let IDObjects = '';
console.log(IDObjects);

class WeatherApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiArr: [],
            FilteredIDs: []
        }
    }

    componentDidMount() {
        this.getCitiesID();
    }

    getCitiesID = () => {

        axios.get('./city.list.json')
        .then( res => {
            IDObjects = res.data;
        });
    }

    filterIDs = () => {
        if(this._input.value.length > 3) {
            this.setState((state) => {
                let newFilteredIDs = IDObjects.filter((IDObj) => {
                    return(IDObj.name.includes(this._input.value))
                })
                return({FilteredIDs: newFilteredIDs})
            })
        }

    }

    removeFindView = () => {
        this.setState((state)=> {
            return({FilteredIDs: []})
        });
        this._input.value = '';
    }

    render() {
        return(
            <div>
                <h1>Weather App</h1>
                <label>Search city: <br></br>
                <input type='text' id='search' ref={(element) => {this._input = element;}} placeholder='Search city' onChange={this.filterIDs}/>
                </label>
                <WeatherAppList CityWeather={this.state.apiArr} Filtered={this.state.FilteredIDs} RemoveFindView={this.removeFindView}/>
            </div>
        )
    }
}

export default WeatherApp;