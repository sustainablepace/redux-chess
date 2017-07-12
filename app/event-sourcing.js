import { createStore } from 'redux'
import React from 'react';
import ChessRules from 'chess-rules';
import ChessAi from 'chess-ai-kong';

ChessAi.setOptions({
    depth: 4,
    monitor: false,
    strategy: 'basic',
    timeout: 10000
});

let EventStore = [];

const currentPosition = () => {
    let position = ChessRules.getInitialPosition();
    for(let i in EventStore) {
        let move = ChessRules.pgnToMove(position, EventStore[i].move);
        position = ChessRules.applyMove(position, move)
    }
    return position
};

/* Reducer */

const reducer = (state, domainEvent) => {
    return {
        position: ChessRules.positionToString(currentPosition())
    }
};

const initialState = {
    position: ChessRules.getInitialPosition(),
    turn: 'w'
};

const enhancer =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // redux dev tools

const store = createStore(reducer, initialState, enhancer);

/* Board */
const displayBoard = () => {
    document.getElementById('chess').textContent = store.getState().position
};
store.subscribe(displayBoard);

/* Players */
const nextMove = () => {
    let position = currentPosition();
    console.log(ChessRules.getGameStatus(position));
    if(ChessRules.getGameStatus(position) === 'OPEN') {
        let move = ChessAi.playPosition(position);
        setTimeout(() => {
            let domainEvent = {
                type: 'pieceMoved',
                move: move
            };
            EventStore.push(domainEvent);
            store.dispatch(domainEvent);
        }, 100);
    }
};
store.subscribe(nextMove);

displayBoard();
nextMove();