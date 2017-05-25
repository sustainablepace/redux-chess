import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactChess from 'Modules/ReactChess';
import { Provider } from 'react-redux';
import ReduxChess from 'Modules/ReduxChess';
import { createStore } from 'redux'
import PlayerComputer from 'Modules/PlayerComputer';
import PlayerHuman from 'Modules/PlayerHuman';

const container = document.createElement("div");
container.setAttribute("id", "chessboard");
document.body.appendChild(container);

const store = createStore(
    ReduxChess,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const black = new PlayerHuman();
//const black = new PlayerComputer();
const white = new PlayerComputer();

ReactDOM.render(
    <ReactChess w={white} b={black} store={store} />,
    container
);