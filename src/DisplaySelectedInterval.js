import React, {Component} from 'react'

class DisplaySelectedInterval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherConditionsNow: {

            },
            weatherConditionsOneDay: [],
            weatherConditionsThreeDays: []
        }
    }

    componentDidMount(){
        this.showWeather();
    }

    showWeather = () => {
        if(this.props.Interval === 'now'){
            this.setState((state)=> {
                return({
                    weatherConditions: {
                        'Perceptible temperature: ': (this.props.Days.day1[0].main.feels_like - 273.15).toFixed(2) + ' °C',
                        'Temperature: ': Math.round(this.props.Days.day1[0].main.temp - 273.15 ).toFixed(2) + ' °C',
                        'Pressure: ': this.props.Days.day1[0].main.pressure + ' hPa',
                        'Humidity: ': this.props.Days.day1[0].main.humidity + ' %'
                    }
                })
            });
        } else if(this.props.Interval === 'one'){
            // this.setState(state => {
            //     return ({weatherConditions: []})
            // })

            // console.log('ONE');

            // this.props.Days.day1.map(value => {
            //     this.setState(state => {
            //         return(state.weatherConditions.push(value.dt_txt)) 
            //     })
            // })
            
            let temperatures = this.props.Days.day1.map(value => {
                return value.main.temp
            })
            console.log(temperatures);

            for(let i = 0; i<= temperatures.length; i++){
                this.setState(state => {
                    return({weatherConditions: {
                        temperatures: 'xd'
                        }
                    })
                })
            }
            
                

                // let temperaturesFeelsLike = state.dividedOnDays.day1.map(value => {
                //     return value.main.feels_like
                // })

                // let pressure = state.dividedOnDays.day1.map(value => {
                //     return value.main.pressure
                // })

                // let humidiyt = state.dividedOnDays.day1.map(value => {
                //     return value.main.humidity
                // })

                // return({
                //     weatherConditions: {
                //     [time]: 'hehe',
                //     }
                // })
        }
    }

    render() {
        setTimeout(this.showWeather, 0);
        let displayWeather = '';

        if(this.state.interval === 'now'){
            displayWeather = Object.entries(this.state.weatherConditions).map((value, label) => {
                return(<li key={label}>{value}</li>)
            })
        } else if(this.state.interval === 'one'){
            //poprawia ! "now" pokazuje polnoc nastepnego dnia. zrobic warunki w show weather
        }

        // setTimeout(() => {
        //     console.log((this.props.Days.day1[0].main.feels_like - 273.15).toFixed(2));
        // },500);

        return (
            <h1>DisplaySelectedInterval</h1>
            )
    }
}

export default DisplaySelectedInterval