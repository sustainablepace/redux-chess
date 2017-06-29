import Chessdiagram from 'react-chessdiagram'; // https://github.com/jniemann66/react-chessdiagram/blob/master/api.md
import Chess from 'chess.js';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

/* Reducer */

const initialState = {
    fen: (new Chess()).fen() // https://de.wikipedia.org/wiki/Forsyth-Edwards-Notation
};

const reducer = (state, domainEvent) => {
    const game = new Chess(state.fen);
    if(domainEvent.type === 'pieceMoved') {
        game.move(domainEvent.move);
    }
    return {
        fen: game.fen(),
        isGameOver: game.game_over()
    };
};

const enhancer =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // redux dev tools

const store = createStore(reducer, initialState, enhancer);

/* Container component */

const mapStateToProps = (state) => {
    const props = {
        fen: state.fen,
        allowMoves: !state.isGameOver,
        squareSize: 90
    };
    return props
};

const mapDispatchToProps = (dispatch) => {
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

            // only valid moves are domain events
            const game = new Chess(this.fen);
            game.move(action.move);
            if(this.fen !== game.fen()) {
                dispatch(action)
            } else {
                console.warn('Invalid move: ' + from + ' - ' + to)
            }
        }
    }
};

const ReactChess = connect(mapStateToProps, mapDispatchToProps)(Chessdiagram);

ReactDOM.render(
    <Provider store={store}>
        <ReactChess/>
    </Provider>,
    document.getElementById('chessboard')
);