import React, {Component} from 'react';

class DisplaySelectedCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: ''
        }
        this.selectInterval = React.createRef();
        this.newDay = {
            day1: [],
            day2: [],
            day3: [],
            day4: [],
            day5: [],
        };
    }

    componentDidMount() {
        this.selectIntervalValue();
    }

    selectIntervalValue = () => {
        setTimeout(() => {
            this.setState(state => {
                console.log(this.selectInterval.current.value)
                return({interval: `${this.selectInterval.current.value}`})
            })
        }, 0);
    }

    checkIntervalAndShow = () => {
    
    }

    render(){
        let displayWeather = '';
        let WeatherObj = this.props.DisplayWeather;

        if(this.state.interval === 'now'){
            displayWeather = Object.entries(WeatherObj).map((value, label) => {
                return(
                        <li key={label}>{value}</li>
                )
            })
        } else if(this.state.interval === 'one'){
            let dayNumber = 0;
            let newDays = this.props.DisplayWeatherArr.filter((obj, index) => {
                if(obj.dt_txt.includes('00:00:00')){

                    dayNumber += 1;

                    for(let i = index; i<=index+7; i++) {
                        console.log(this.props.DisplayWeatherArr[i], i);
                        this.newDay['day'+dayNumber].push(this.props.DisplayWeatherArr[i]);
                    }
                    console.log(dayNumber);
                    return(obj.dt_txt.includes('00:00:00'))
                }
            })
            console.log(newDays);
            console.log(this.newDay);
        }
        
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
