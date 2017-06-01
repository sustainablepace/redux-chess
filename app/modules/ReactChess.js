import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import { connect } from 'react-redux';
import PlayerComputer from 'Modules/PlayerComputer';
import PlayerHuman from 'Modules/PlayerHuman';

class ReactChessGame extends React.Component {

    humanMove(piece, from, to) {
        if(!this.isGameOver && this.allowMoves) {
            this.onHumanTurn(this.currentPlayer, from, to);
        }
    }

    computerMove() {
        if(!this.isGameOver && !this.allowMoves) {
            setTimeout(() => {
                this.onComputerTurn(this.currentPlayer, this.fen);
            }, 100)
        }
    }

    componentDidMount() {
        this.computerMove.call(this.props)
    }

    componentDidUpdate() {
        this.computerMove.call(this.props)
    }

    render() {
        return <Chessdiagram onMovePiece={this.humanMove} {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        fen: state.fen,
        turn: state.turn,
        isGameOver: state.isGameOver,
        currentPlayer: state[state.turn],
        allowMoves: state[state.turn] instanceof PlayerHuman,
        squareSize: 90
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onHumanTurn: (humanPlayer, from, to) => {
            humanPlayer.move(dispatch, from, to);
        },
        onComputerTurn: (computerPlayer, fen) => {
            computerPlayer.move(dispatch, fen);
        }
    }
};

const ReactChess = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactChessGame);

export default ReactChess;
