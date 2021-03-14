import React, {Component} from 'react';
import WeatherAppList from './WeatherAppSearchCity';

import './WeatherApp.css';
import axios from 'axios';

class WeatherApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            FilteredIDs: [],
            ShowInput: true,
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
        if(this.myInput.current.value.length > 4) {
            this.setState((state) => {
                let newFilteredIDs = this.IDObjects.filter((IDObj) => {
                    return(IDObj.name.includes(this.myInput.current.value))
                })
                return({FilteredIDs: newFilteredIDs})
            })
        } else {
            this.setState(state => {
                return({FilteredIDs: []})
            })
        }
    }

    removeFindView = () => {
        this.setState((state)=> {
            return({FilteredIDs: []})
        });
        this.myInput.current.value = '';
    }

    hideInput = () => {
        this.setState((state) => {
            return ({ShowInput: !state.ShowInput});
        })
    }

    render() {
        let showInput = ''

        if(this.state.ShowInput){
            showInput = (
                <label>Search city: <br></br>
                <input type='text' id='search' ref={this.myInput} placeholder='Search city' onChange={() => {
                    this.filterIDs();
                    }} />
                </label>);
        } else {
            showInput = '';
        }

        return(
            <div className='WeatherApp'>
                <h1>Weather App</h1>
                {showInput}
                <WeatherAppList Filtered={this.state.FilteredIDs} RemoveFindView={this.removeFindView} HideInput={this.hideInput}/>
            </div>
        )
    }
}

export default WeatherApp;