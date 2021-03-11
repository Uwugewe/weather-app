import React, {Component} from 'react';

class DisplaySelectedCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectValue: ''
        }
        this.selectInterval = React.createRef();
    }

    componentDidMount(){
        this.selectIntervalValue();
    }

    selectIntervalValue = () => {
        setTimeout(() => {
            this.setState(state => {
                console.log(this.selectInterval.current.value)
                return({SelectValue: `${this.selectInterval.current.value}`})
            })
        }, 0);
    }

    render(){

        let WeatherObj = this.props.DisplayWeather;

        let displayWeather = Object.entries(WeatherObj).map((value, label) => {
            return(
                    <li key={label}>{value}</li>
            )
        })
        
        return(
            <div>
                <label>Choose interval:
                    <select name="days" id="time-interval" ref={this.selectInterval} onChange={this.selectIntervalValue}>
                        <option value="now">Now</option>
                        <option value="one">1 day</option>
                        <option value="three">3 days</option>
                        <option value="seven">7 days</option>
                    </select>
                </label>
                {displayWeather}
            </div>
        )
    }

}

export default DisplaySelectedCity;
