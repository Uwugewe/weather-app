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
            displayFirstDay: ''
        };
    }

    componentDidMount() {
        this.setStateForThreeDays();
        // setTimeout(() => {
        //     this.setStateForThreeDays();
        // },500);
    }

    setStateForThreeDays = () => {
        for (let value of Object.entries(this.props.Days)) {
            if (value[0] === 'day2') {
                value[1].forEach(underValue => {
                    this.setState(state => {
                        state.weatherConditionsThreeDays.day1[underValue.dt_txt.substr(10)] = (underValue.main.temp - 273.15).toFixed(2);
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
        // this.setState(state => {
        //     let displayFirstDay = Object.entries(this.state.weatherConditionsThreeDays.day1).map((value, index) => {
        //         console.log(index, value);
        //         return(
        //             <li key={index}>{value}</li>
        //         )
        //     })
        //     return(
            
        //     )
        // });
    }

    render() {

        // let displayFirstDay = '';
        // setTimeout(() => {
        //     displayFirstDay = Object.entries(this.state.weatherConditionsThreeDays.day1).map((value, index) => {
        //         console.log(index, value);
        //         return(
        //             <li key={index}>{value}</li>
        //         )
        //     });
        //     console.log(displayFirstDay);
        // });
        

        return(
            <div className='scrollBar'>
                <div className='firstDay'>
                    <h2>first day</h2>
                </div>
                <div className='firstDay'>
                    <h2>sec day</h2>
                </div>
                <div className='firstDay'>
                    <h2>third fay</h2>
                </div>
            </div>
        )
    }
}

export default DisplayViewForThree;