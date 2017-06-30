import Chess from 'chess.js';
import { createStore } from 'redux'
import React from 'react';

/* Reducer */

const reducer = (state, domainEvent) => {
    const game = new Chess(state.fen);
    if(domainEvent.type === 'pieceMoved') {
        game.move(domainEvent.move);
    }
    return {
        fen: game.fen()
    }
};

const initialState = {
    fen: (new Chess()).fen() // https://de.wikipedia.org/wiki/Forsyth-Edwards-Notation
};

const enhancer =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // redux dev tools

const store = createStore(reducer, initialState, enhancer);

/* Board */
const displayBoard = () => {
    const fen = store.getState().fen;
    const game = new Chess(fen);
    document.getElementById('chessboard').textContent = game.ascii()
};
store.subscribe(displayBoard);

/* Players */
const nextMove = () => {
    const fen = store.getState().fen;
    const game = new Chess(fen);
    if(!game.game_over()) {
        let moves = game.moves();
        let move = moves[Math.floor(Math.random() * moves.length)];
        setTimeout(() => {
            store.dispatch({
                type: 'pieceMoved',
                move: move
            });
        }, 100);
    }
};
store.subscribe(nextMove);

nextMove();