import Chessdiagram from 'react-chessdiagram'; // https://github.com/jniemann66/react-chessdiagram/blob/master/api.md
import Chess from 'chess.js';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

/* Reducer */

const reducer = (state = { fen: (new Chess()).fen() }, domainEvent) => {
    const game = new Chess(state.fen);
    if(domainEvent.type === 'pieceMoved') {
        game.move(domainEvent.move);
    }
    return {
        fen: game.fen(),
        isGameOver: game.game_over()
    }
};

const enhancer =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // redux dev tools

const store = createStore(reducer, enhancer);

/* Container component */

const mapStateToProps = (state) => {
    return {
        fen: state.fen,
        allowMoves: !state.isGameOver,
        squareSize: 90
    }
};

const mapDispatchToProps = (dispatch) => {
    const isMoveValid = (fen, move) => { // invariant
        return (new Chess(fen)).move(move) !== null
    };

    return {
        onMovePiece: function(piece, from, to) {
            const action = {
                type: 'pieceMoved',
                move: {
                    from: from,
                    to: to,
                    promotion: 'q' // always promote to queen for simplicity's sake
                }
            };

            if(isMoveValid(this.fen, action.move)) { // only valid moves are domain events
                dispatch(action)
            } else {
                console.warn('Invalid move: ' + from + ' - ' + to)
            }
        }
    }
};

const ReactChess = connect(mapStateToProps, mapDispatchToProps)(Chessdiagram);

/* Root component */

ReactDOM.render(
    <Provider store={store}>
        <ReactChess/>
    </Provider>,
    document.getElementById('chess')
);