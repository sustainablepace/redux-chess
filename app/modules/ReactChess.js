import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import {createStore} from 'redux'
import Chess from 'chess.js'

class ReactChess extends Component {
    componentWillMount() {
        const game = new Chess();
        this.setState({
            fen: game.fen()
        });

        const reducer = function (state, action) {
            const fen = state && state.fen;
            const game = new Chess();
            if (fen) {
                game.load(fen);
            }
            if (action.move) {
                game.move(action.move);
            }
            return {
                fen: game.fen()
            };
        };

        this.store = createStore(reducer);
    }

    componentDidMount() {
        const WHITE = 'w';
        const BLACK = 'b';
        const player = (blackOrWhite) => {
            if (blackOrWhite !== WHITE && blackOrWhite !== BLACK) {
                throw 'Color must be either "b" or "w".';
            }
            return () => {
                const pieceColor = blackOrWhite;
                const fen = this.store.getState().fen;
                const game = new Chess();
                game.load(fen);
                if (!game.game_over() && game.turn() === pieceColor) {
                    const moves = game.moves();
                    const move = moves[Math.floor(Math.random() * moves.length)];
                    setTimeout(() => {
                        this.store.dispatch({
                            type: "move",
                            move: move
                        });
                    }, 100);
                }
            }
        };

        const updateComponent = () => {
            const fen = this.store.getState().fen;
            this.setState({
                fen: fen
            });
        };

        this.store.subscribe(updateComponent);
        this.store.subscribe(player(WHITE));
        this.store.subscribe(player(BLACK));

        this.store.dispatch({
            type: 'init'
        });
    }

    render() {
        return <Chessdiagram flip={false} fen={this.state.fen} squareSize={90} lightSquareColor="#2492FF"
                             darkSquareColor="#005EBB" allowMoves={false}/>
    }

}

export default ReactChess
