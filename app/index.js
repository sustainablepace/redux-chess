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

// const WHITE = 'w';
// const BLACK = 'b';
//
// let players = {};
// players[WHITE] = null;
// players[BLACK] = null;
// players[WHITE] = new PlayerRandom({
//     store: store,
//     pieceColor: WHITE
// });
// players[BLACK] = new PlayerHuman({
//     store: store,
//     pieceColor: BLACK
// });


ReactDOM.render(
    <Provider store={store}>
        <ReactChess />
    </Provider>,
    container
);