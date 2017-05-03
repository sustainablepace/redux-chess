import React, { Component } from 'react';
import Chessdiagram from 'react-chessdiagram';
import { createStore } from 'redux'
import Chess from 'chess.js'

class ReactChess extends Component {
  componentWillMount() {
      this.game = new Chess();
      this.setState({
          fen:this.game.fen()
      });

      const reducer = function(state, action) {
          console.log("Updating store: ");
          console.log(action);
          const game = new Chess();
          const fen = state && state.fen;
          if(fen) {
              game.load(fen);
          }
          if(action.move){
              game.move(action.move);
          }
          return {
              fen: game.fen()
          };
      };

      this.store = createStore(reducer);
  }

  componentDidMount() {
      this.store.subscribe(() => {
          const fen = this.store.getState().fen;
          this.setState({
              fen: fen
          });
          setTimeout(() => {
              console.log("Updating state after change in store.");
              console.log(this.state);
              this.game.load(fen);
              if(!this.game.game_over()) {
                  const moves = this.game.moves();
                  const move = moves[Math.floor(Math.random() * moves.length)];
                  console.log(move);
                  this.store.dispatch({
                      type: "move",
                      move: move
                  });
              }

          },100);

      });
      this.store.dispatch({
          type:'init'
      });
  }

  render() {
    return <Chessdiagram flip={false} fen={this.state.fen} squareSize={90} lightSquareColor="#2492FF" darkSquareColor="#005EBB" allowMoves={false}/>
  }

}

export default ReactChess
