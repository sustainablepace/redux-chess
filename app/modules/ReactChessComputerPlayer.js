import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import { connect } from 'react-redux';
import PlayerHuman from 'Modules/PlayerHuman';

class ReactChessComputerPlayer extends React.Component {

    componentDidMount() {
        this.props.onMovePiece.call(this.props)
    }

    componentDidUpdate() {
        this.props.onMovePiece.call(this.props)
    }

    render() {
        return <div>
            <div>{this.props.color}: <span>{this.props.timeLeft}</span></div>
        </div>
    }
}

const queryModel = (state) => { // in react-redux: mapStateToProps
    return {
        fen: state.fen,
        isGameOver: state.isGameOver,
        currentPlayer: state.currentPlayer,
        isComputerTurn: state.isComputerTurn,
        turn: state.turn
    }
};

const commandModel = (dispatch) => { // in react-redux: mapDispatchToProps
    return {
        onMovePiece: function() {
            if(!this.isGameOver && this.isComputerTurn) {
                setTimeout(() => {
                    let domainEvent = this.currentPlayer.createAction(this.fen);
                    if(domainEvent !== null && domainEvent.type === "pieceMoved" && domainEvent.move) {
                        console.log('computer player draws');
                        store.dispatch(domainEvent) // Flux = Dispatcher
                    }
                }, 100)
            }
        }
    }
};

export default connect(queryModel, commandModel)(ReactChessComputerPlayer);
