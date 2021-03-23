import React, {Component} from 'react';

class DisplayViewForThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherConditionsThreeDays: {

            }
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setStateForThreeDays();
        },500);
    }

    setStateForThreeDays = () => {

        this.setState(state => {
            return ({weatherConditionsThreeDays: {
                day1: this.props.Days.day2,
                day2: this.props.Days.day3,
                day3: this.props.Days.day4
                }
            })
        });
    }

    render() {

        return(
            <div className='scrollBar'>

            </div>
        )
    }
}

export default DisplayViewForThree;