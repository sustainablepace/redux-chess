import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactChess from 'Modules/ReactChess';

const container = document.createElement("div");
container.setAttribute("id", "chessboard");
document.body.appendChild(container);

const board = <ReactChess />;
ReactDOM.render(board, container);

// const stockfish = new Worker('stockfish.js');
// stockfish.onmessage = function(event) {
//     //NOTE: Web Workers wrap the response in an object.
//     console.log(event.data ? event.data : event);
// };

//let chessEngine = new ChessEngine(stockfish);