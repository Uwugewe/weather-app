import React, {Component} from 'react';
import DisplayViewForNow from './DisplayViewForNow';
import DisplayViewForOne from './DisplayViewForOne';
import DisplayViewForThree from './DisplayViewForThree';

class ChangeDaysInterval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: '',
            dividedOnDays: {
                day1: [],
                day2: [],
                day3: [],
                day4: [],
                day5: []
            }
        }
        this.selectInterval = React.createRef();
    }

    componentDidMount() {
        this.selectIntervalValue();
        setTimeout(this.divideWeatherOnDays,0);
    }

    selectIntervalValue = () => {
        setTimeout(() => {
            this.setState(state => {
                return({interval: `${this.selectInterval.current.value}`})
            });
        }, 0);
    }

    divideWeatherOnDays = () => {
        let dayNumber = 0;
            
        this.props.DisplayWeatherArr.forEach((obj, index) => {
            if(obj.dt_txt.includes('00:00:00')){
                dayNumber += 1;

                for(let i = index; i<=index+7; i++) {
                    if(this.props.DisplayWeatherArr[i] !== undefined){
                        this.setState(state => {
                            return(state.dividedOnDays['day'+dayNumber].push(this.props.DisplayWeatherArr[i]))
                        });
                    }
                }
            }
        });
    }

    render(){
        let displaySelectedInterval = '';
        let cityProperties = (
            <div>
                <h2>City: {this.props.CityProperties.name} ({this.props.CityProperties.cityCountry})</h2>
            </div>
        );

        if(this.state.interval === 'now') {
            displaySelectedInterval = (
                <DisplayViewForNow Day={this.state.dividedOnDays.day1}/>
            )
        } else if(this.state.interval === 'one') {
            displaySelectedInterval = (
                <DisplayViewForOne Day={this.state.dividedOnDays.day1}/>
            )
        } else if(this.state.interval === 'three') {
            displaySelectedInterval = (
                <DisplayViewForThree Days={this.state.dividedOnDays}/>
            )
        }

        return(
            <div>
                {cityProperties}
                <label>Choose interval:
                    <select name="days" id="time-interval" ref={this.selectInterval} onChange={this.selectIntervalValue}>
                        <option value="now">Now</option>
                        <option value="one">1 day</option>
                        <option value="three">3 days</option>
                    </select>
                </label>
                {displaySelectedInterval}
            </div>
        )
    }
}

export default ChangeDaysInterval;
