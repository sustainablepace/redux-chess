import {connect} from 'react-redux';
import React from 'react';

/* Presentational Component */
class ReactChessClock extends React.Component {
    componentDidUpdate() {
        setTimeout(() => {
            this.props.timePassed.call(this.props);
        }, 1000);
        this.props.timeElapsed.call(this.props)
    };

    render() {
        return <div className="clock">
            {Math.floor(this.props.time / 60)}:{("00" + this.props.time % 60).slice(-2)}
        </div>
    }
}

/* Container Component */
export default connect(
    (state, ownProps) => {
        return {
            myTurn: state.clock.turn === ownProps.color,
            isGameOver: state.board.isGameOver,
            time: ownProps.color === 'w' ? state.clock.timeW : state.clock.timeB
        }
    },
    (dispatch) => {
        const isTimeLeft = function () {
            return this.time > 0 && !this.isGameOver
        };
        const isMyTurn = function () {
            return this.myTurn && !this.isGameOver
        };
        const isTimeElapsed = function () {
            return this.time <= 0 && !this.isGameOver
        };
        return {
            timePassed: function () {
                if (isTimeLeft.call(this) && isMyTurn.call(this)) {
                    dispatch({
                        type: 'timePassed',
                        color: this.color
                    })
                }
            },
            timeElapsed: function () {
                if (isTimeElapsed.call(this)) {
                    dispatch({
                        type: 'timeElapsed',
                        color: this.color
                    })
                }
            }
        }
    }
)(ReactChessClock);