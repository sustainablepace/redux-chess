import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactChess from 'Modules/ReactChess';
import ReduxChess from 'Modules/ReduxChess';
import { createStore } from 'redux'
import PlayerComputer from 'Modules/PlayerComputer';
import PlayerHuman from 'Modules/PlayerHuman';

const store = createStore(ReduxChess, {
    b: new PlayerHuman(),
    // b: new PlayerComputer(),
    w: new PlayerComputer()
});

ReactDOM.render(
    <ReactChess store={store} />,
    document.getElementById('chessboard')
);