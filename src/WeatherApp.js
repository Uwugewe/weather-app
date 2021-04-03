import React, {Component} from 'react';
import WeatherAppList from './WeatherAppSearchCity';
import logo from './logo.svg';
import MetaTags from 'react-meta-tags';

import './WeatherApp.css';
import axios from 'axios';

class WeatherApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            filteredIDs: [],
            showInput: true,
        }
        this.IDObjects = '';
        this.myInput = React.createRef();
    }

    componentDidMount() {
        this.getCitiesID();
    }

    getCitiesID = () => {
        axios.get('./city.list.json')
        .then(res => {
            this.IDObjects = res.data;
        });
    }

    filterIDs = () => {
        this.myInput.current.value = this.myInput.current.value.trim().charAt(0).toUpperCase()+this.myInput.current.value.slice(1).toLowerCase();
        if(this.myInput.current.value.length > 4) {
            this.setState(() => {
                let newFilteredIDs = this.IDObjects.filter((IDObj) => {
                    return(IDObj.name.includes(this.myInput.current.value))
                })
                return({filteredIDs: newFilteredIDs})
            })
        } else {
            this.setState({filteredIDs: []})
        }
    }

    removeFindView = () => {
        this.setState({filteredIDs: []});
        this.myInput.current.value = '';
    }

    hideInput = () => {
        this.setState((state) => {
            return ({showInput: !state.showInput});
        })
    }

    render() {
        let showInput = ''

        if(this.state.showInput){
            showInput = (
                <label>Search city: <br></br>
                <input className='SearchInput' type='text' id='search' ref={this.myInput} onChange={() => {
                    this.filterIDs();
                    }} />
                </label>);
        } else {
            showInput = '';
        }

        return(
            <div className='WeatherApp'>
                <MetaTags>
                <title>WeatherApp by Artur Ksybek</title>
                </MetaTags>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Weather App by Artur Ksybek</h1>
                {showInput}
                <WeatherAppList Filtered={this.state.filteredIDs} RemoveFindView={this.removeFindView} HideInput={this.hideInput}/>
            </div>
        )
    }
}

export default WeatherApp;