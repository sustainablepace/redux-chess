import React, { Component } from 'react';
import ReactDOM from 'react-dom';	
import ChessApp from 'Modules/ChessApp';
import { createStore } from 'redux'

const chessboard = document.createElement("div");
chessboard.setAttribute("id", "chessboard");
document.body.appendChild(chessboard);

const stockfish = new Worker('stockfish.js');
console.log(stockfish);

stockfish.onmessage = function(event) {
    //NOTE: Web Workers wrap the response in an object.
    console.log(event.data ? event.data : event);
};
//stockfish.postMessage("go depth 15");

const state = function(state = {}, action = '') {
  return {
    position:  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  };
};

const store = createStore(state);

const ChessDiagram = <ChessApp/>;
ReactDOM.render(
	ChessDiagram,
	chessboard
);
