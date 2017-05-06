import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactChess from 'Modules/ReactChess';
import { Provider } from 'react-redux';
import ReduxChess from 'Modules/ReduxChess';
import { createStore } from 'redux'
import PlayerRandom from 'Modules/PlayerRandom';
import PlayerHuman from 'Modules/PlayerHuman';

const container = document.createElement("div");
container.setAttribute("id", "chessboard");
document.body.appendChild(container);

const store = createStore(ReduxChess);

ReactDOM.render(
    <ReactChess w="human" b="computer" store={store} />,
    container
);