import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import { connect } from 'react-redux';
import PlayerHuman from 'Modules/PlayerHuman';

class ReactChessContainer extends React.Component { // Container component

    humanMove(piece, from, to) { // Command handler
        if(!this.isGameOver && this.allowMoves) {
            this.movePieceOnHumanTurn(this.currentPlayer, this.fen, from, to);
        }
    }

    computerMove() { // Command handler
        if(!this.isGameOver && !this.allowMoves) {
            setTimeout(() => {
                this.movePieceOnComputerTurn(this.currentPlayer, this.fen);
            }, 100)
        }
    }

    componentDidMount() {
        this.computerMove.call(this.props)
    }

    componentDidUpdate() {
        this.computerMove.call(this.props)
    }

    render() { // Presentational component
        return <Chessdiagram onMovePiece={this.humanMove} {...this.props}/>
    }
}

const queryModel = (state) => { // in react-redux: mapStateToProps
    return {
        fen: state.fen,
        turn: state.turn,
        isGameOver: state.isGameOver,
        currentPlayer: state[state.turn],
        allowMoves: state[state.turn] instanceof PlayerHuman,
        squareSize: 90
    }
};

const commandModel = (dispatch) => { // in react-redux: mapDispatchToProps
    return {
        movePieceOnHumanTurn: (humanPlayer, fen, from, to) => {
            let domainEvent = humanPlayer.createAction(from, to);
            if(domainEvent !== null && domainEvent.type === "pieceMoved" && domainEvent.move) {
                dispatch(domainEvent) // Flux = Dispatcher
            }
            // void
        },
        movePieceOnComputerTurn: (computerPlayer, fen) => {
            let domainEvent = computerPlayer.createAction(fen);
            if(domainEvent !== null && domainEvent.type === "pieceMoved" && domainEvent.move) {
                dispatch(domainEvent) // Flux = Dispatcher
            }
            // void
        }
    }
};

export default connect(queryModel, commandModel)(ReactChessContainer);
