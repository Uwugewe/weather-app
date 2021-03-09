import React, {Component} from 'react';
import WeatherAppList from './WeatherAppList';

import './WeatherApp.css';
import axios from 'axios';

class WeatherApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            FilteredIDs: []
        }
        this.IDObjects = '';
        this.myInput = React.createRef();
    }

    componentDidMount() {
        this.getCitiesID();
    }

    getCitiesID = () => {
        axios.get('./city.list.json')
        .then( res => {
            this.IDObjects = res.data;
        });
    }

    filterIDs = () => {
        this.myInput.current.value = this.myInput.current.value.trim().charAt(0).toUpperCase()+this.myInput.current.value.slice(1).toLowerCase();
        if(this.myInput.current.value.length > 3) {
            this.setState((state) => {
                let newFilteredIDs = this.IDObjects.filter((IDObj) => {
                    return(IDObj.name.includes(this.myInput.current.value))
                })
                return({FilteredIDs: newFilteredIDs})
            })
        }
    }

    removeFindView = () => {
        this.setState((state)=> {
            return({FilteredIDs: []})
        });
        this.myInput.current.value = '';
    }

    render() {
        return(
            <div>
                <h1>Weather App</h1>
                <label>Search city: <br></br>
                <input type='text' id='search' ref={this.myInput} placeholder='Search city' onChange={() => {
                    this.filterIDs();
                    }}/>
                </label>
                <WeatherAppList Filtered={this.state.FilteredIDs} RemoveFindView={this.removeFindView}/>
            </div>
        )
    }
}

export default WeatherApp;