import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import { connect } from 'react-redux';
import Chess from 'chess.js';

class ReactChessPlayers extends React.Component {

    componentWillMount() {
        this.props.store.subscribe(() => {
            const fen = this.props.store.getState().fen;
            const game = new Chess();
            game.load(fen);
            const isHumanTurn = this.props[game.turn()] === 'human';
            if(!isHumanTurn) {
                setTimeout(() => {
                    this.props.onComputerTurn(fen);
                }, 100)
            }
        });
        this.props.store.dispatch({
            type: 'init'
        });
    }

    render() {
        return <Chessdiagram squareSize={90} {...this.props}/>
    }
}

const mapStateToProps = (state, ownProps) => {
    const game = new Chess();
    game.load(state.fen);
    return {
        fen: game.fen(),
        allowMoves: ownProps[game.turn()] === 'human'
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMovePiece: (piece, from, to) => {
            dispatch({
                type: 'move',
                move: {from: from, to: to, promotion: 'q'}
            })
        },
        onComputerTurn: (fen) => {
            const game = new Chess();
            game.load(fen);
            if (!game.game_over()) {
                const moves = game.moves();
                const move = moves[Math.floor(Math.random() * moves.length)];
                dispatch({
                    type: 'move',
                    move: move
                });
            }
        }
    }
};

const ReactChess = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactChessPlayers);

export default ReactChess
