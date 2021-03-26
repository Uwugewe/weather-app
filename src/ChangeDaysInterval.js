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
        this.divideWeatherOnDays();
    }

    selectIntervalValue = () => {
        this.setState(state => {
            return({interval: `${this.selectInterval.current.value}`})
        });
    }

    divideWeatherOnDays = () => {
        let dayNumber = 0;
        let allData = this.props.DisplayWeatherArr;
        let allDataDividedOnDays = [];

        for(let obj of allData){
            
            if(obj.dt_txt.includes('00:00:00')){
                ++dayNumber;
            }

            obj.day = dayNumber;
            allDataDividedOnDays.push(obj);
        }

        let nowArr = allDataDividedOnDays[0];

        let firstDayArr = allDataDividedOnDays.filter(obj => {
            if(obj.day === 1){
                return obj
            }
        });

        let secondDayArr = allDataDividedOnDays.filter(obj => {
            if(obj.day === 2){
                return obj
            }
        });

        let thirdDayArr = allDataDividedOnDays.filter(obj => {
            if(obj.day === 3){
                return obj
            }
        });

        let fourthDayArr = allDataDividedOnDays.filter(obj => {
            if(obj.day === 4){
                return obj
            }
        });

        this.setState({dividedOnDays: {
            nowArr,
            firstDayArr,
            secondDayArr,
            thirdDayArr,
            fourthDayArr
        }});
        console.log(nowArr);
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
                <DisplayViewForNow Day={this.state.dividedOnDays.nowArr}/>
            )
        } else if(this.state.interval === 'one') {
            displaySelectedInterval = (
                <DisplayViewForOne Day={this.state.dividedOnDays.firstDayArr}/>
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
