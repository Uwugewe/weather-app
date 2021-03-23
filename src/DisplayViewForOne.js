import React, {Component} from 'react';

class DisplayViewForOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: {
                icons: [],
                descriptions: []
            },
            weatherConditionsOneDayDemo: {

            }
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setStateForOneDay();
        },500);
    }

    setStateForOneDay = () => {
        this.props.Day.forEach(value => {
            this.state.weatherConditionsOneDayDemo[value.dt_txt] = (value.main.temp - 273.15).toFixed(2);
            this.setState(state => {
                return(
                    state.resources.icons.push(`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`),
                    state.resources.descriptions.push(value.weather[0].description)
                )
            });
        });
    }

    render() {
    
        let displayDemo = ''

        displayDemo = Object.entries(this.state.weatherConditionsOneDayDemo).map((value, i) => {
            return(
                <div className='BOX-ViewForOne'>
                    <p>{value[0].substr(10)}</p>
                    <p className='Description'>{this.state.resources.descriptions[i]}</p>
                    <h2>{value[1]}</h2>
                    <img src={this.state.resources.icons[i]}/>
                </div>
            )
        });

        return (
            <div>
                <h2>{(this.props.Day[0].dt_txt).substr(0,10)}</h2>
                <div className='ViewWeatherForOne'>
                    {displayDemo}
                </div>
            </div>
        )
    }
}

export default DisplayViewForOne;