import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactChess from 'Modules/ReactChess';
import ReduxChess from 'Modules/ReduxChess';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import PlayerComputer from 'Modules/PlayerComputer';
import PlayerHuman from 'Modules/PlayerHuman';
import ReactChessComputerPlayer from 'Modules/ReactChessComputerPlayer';

const store = createStore(ReduxChess, {
    b: new PlayerHuman(),
    w: new PlayerComputer()
});

store.subscribe(function() {
    const state = store.getState();
    console.log(state);
    if(!state.isGameOver && state.isComputerTurn) {
        setTimeout(() => {
            let domainEvent = state.currentPlayer.createAction(state.fen);
            if(domainEvent !== null && domainEvent.type === 'pieceMoved' && domainEvent.move) {
                console.log('computer player draws');
                store.dispatch(domainEvent) // Flux = Dispatcher
            }
        }, 100)
    }
});

store.dispatch({
    type:'listenerReady'
});

ReactDOM.render(
    <Provider store={store}>
        <ReactChess />
    </Provider>,
    document.getElementById('chessboard')
);