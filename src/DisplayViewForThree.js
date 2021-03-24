import React, { Component } from 'react';

class DisplayViewForThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherConditionsThreeDays: {
                day1: {},
                day2: {},
                day3: {}
            },
            twojaStara: {}
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setStateForThreeDays();
        },500);
    }

    setStateForThreeDays = () => {
        for (let value of Object.entries(this.props.Days)) {
            if (value[0] === 'day2') {
                value[1].forEach(underValue => {
                    this.setState(state => {
                        state.twojaStara[underValue.dt_txt.substr(10)] = (underValue.main.temp - 273.15).toFixed(2);
                    });
                });
            } else if (value[0] === 'day3') {
                value[1].forEach(underValue => {
                    this.setState(state => {
                        state.weatherConditionsThreeDays.day2[underValue.dt_txt.substr(10)] = (underValue.main.temp - 273.15).toFixed(2);
                    });
                });
            } else if (value[0] === 'day4') {
                value[1].forEach(underValue => {
                    this.setState(state => {
                        state.weatherConditionsThreeDays.day3[underValue.dt_txt.substr(10)] = (underValue.main.temp - 273.15).toFixed(2);
                    });
                });
            }
        }
    }

    render() {

        let displayFirstDay = '';

        displayFirstDay = Object.entries(this.state.twojaStara).map(value => {
            console.log(value);
            return(
                <li>test</li>
            )
        });

        console.log(displayFirstDay);

        return(
            <div className='scrollBar'>
                <div className='firstDay'>
                    {displayFirstDay}
                </div>
                <div className='firstDay'>

                </div>
                <div className='firstDay'>

                </div>
            </div>
        )
    }
}

export default DisplayViewForThree;