import React, {Component} from 'react';

class DisplayViewForThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherConditionsThreeDays: {
                hours: [],
                temperatures: []
            }
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setStateForThreeDays();
        },500);
    }

    setStateForThreeDays = () => {
        let i = 0;
        for (let [key, value] of Object.entries(this.props.Days)){
            i += 1;
            if(i >= 2 && i <= 4 ) {
                value.forEach(underValue => {
                    this.setState(state => {
                        return(
                            state.weatherConditionsThreeDays.hours.push(underValue.dt_txt),
                            state.weatherConditionsThreeDays.temperatures.push((underValue.main.temp - 273.15).toFixed(2))
                        )
                    });
                });
            }
        }
    }

    render() {
    
        let displayHours = '';
        let displayTemperaturesForHours = '';
        let icon = '';
        let description = '';

        displayHours = this.state.weatherConditionsThreeDays.hours.map((value, index) => {
            return (
                <div className='hour'><p key={index}>{value}</p></div>
            )
        });
        displayTemperaturesForHours = this.state.weatherConditionsThreeDays.temperatures.map((value,index) => {
            return(
                <div className='hour'><p key={index}>{Math.round(value)}°C</p></div>
            )
        });

        return(
            <div className='chart'>
                <div className='temperaturesForChart'>
                    {displayTemperaturesForHours}
                </div>
                <div className='hoursThreeDays'>
                    {displayHours}
                </div>
            </div>
        )
    }
}

export default DisplayViewForThree;