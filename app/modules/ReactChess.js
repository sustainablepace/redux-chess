import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import { connect } from 'react-redux';
import Chess from 'chess.js';
import PlayerComputer from 'Modules/PlayerComputer';
import PlayerHuman from 'Modules/PlayerHuman';

class ReactChessPlayers extends React.Component {

    onMovePiece(piece, from, to) {
        const game = new Chess(this.store.getState().fen);
        if(this[game.turn()] instanceof PlayerHuman) {
            this.onHumanTurn(game.fen(), from, to);
        }
    }

    render() {
        const game = new Chess(this.props.store.getState().fen);
        if(this.props[game.turn()] instanceof PlayerComputer) {
            setTimeout(() => {
                this.props.onComputerTurn(game.fen());
            }, 200)
        }
        return <Chessdiagram squareSize={90} onMovePiece={this.onMovePiece} {...this.props}/>
    }
}

const mapStateToProps = (state, ownProps) => {
    const game = new Chess(state.fen);
    return {
        fen: game.fen(),
        allowMoves: ownProps[game.turn()] instanceof PlayerHuman
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onHumanTurn: (fen, from, to) => {
            const game = new Chess(fen);
            if (!game.game_over()) {
                const humanPlayer = ownProps[game.turn()];
                humanPlayer.move(dispatch, fen, from, to);
            }
        },
        onComputerTurn: (fen) => {
            const game = new Chess(fen);
            if (!game.game_over()) {
                const computerPlayer = ownProps[game.turn()];
                setTimeout(() => {
                    computerPlayer.move(dispatch, fen);
                }, 200);
            }
        }
    }
};

const ReactChess = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactChessPlayers);

export default ReactChess;
