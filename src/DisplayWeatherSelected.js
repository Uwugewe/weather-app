import React, {Component} from 'react';

class DisplaySelectedCity extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.myRange = React.createRef();
    }
    render(){

        let WeatherObj = this.props.DisplayWeather;

        let displayWeather = Object.entries(WeatherObj).map((value, label) => {
            return(
                    <li key={label}>{value}</li>
            )
        })

        setTimeout(() => {
            console.log(this.myRange)
        }, 0);
        
        return(
            <div>
                <input id="interval" type="range" ref={this.myRange} list="tickmarks" step="50"/>

                <datalist id="tickmarks">
                    <option value="0" label="0%"></option>
                    <option value="50" label="50%"></option>
                    <option value="100" label="100%"></option>
                </datalist>
                {displayWeather}
            </div>
        )
    }

}

export default DisplaySelectedCity;
