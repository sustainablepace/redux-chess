import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import { connect } from 'react-redux';

class ReactChessClock extends React.Component {
    render() {
        return <div>
            <div>WHITE: <span>{this.props.timeLeftWhite}</span></div>
            <div>BLACK: <span>{this.props.timeLeftBlack}</span></div>
        </div>
    }
}

export default ReactChessClock