import React, { Component } from 'react';
import Chessdiagram from 'react-chessdiagram';

class ChessApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position:  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    }
  }

  render() {
    return <Chessdiagram flip={false} fen={this.state.position} squareSize={45} lightSquareColor="#2492FF" darkSquareColor="#005EBB" onMovePiece={this.onMovePiece}/>
  }

  onMovePiece(piece, fromSquare, toSquare) {
          const message = 'You moved ' + piece + fromSquare + ' to ' + toSquare + ' !';
          console.log(message);
  }

}

export default ChessApp
