import Chess from 'chess.js'
import { createStore, applyMiddleware, compose } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import ChessDiagram from 'react-chessdiagram'

const initialState = {
    board: (new Chess()).ascii(),
    fen: (new Chess()).fen(),
    moves: (new Chess()).moves(),
    isGameOver: false
};

const reducer = (state = initialState, action) => {
    if(action && action.type === 'movePiece' && action.move) {
        const game = new Chess();
        game.load(state.fen);
        game.move(action.move);
        return {
            board: game.ascii(),
            fen: game.fen(),
            moves: game.moves(),
            isGameOver: game.game_over()
        }
    }
    return Object.assign({}, state)
};

const EventStore = [];

const middleware = store => dispatch => action => {
    if(action && action.type === 'movePiece') {
        EventStore.push(action);
    }
    dispatch(action)
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(middleware)));

const mapStateToProps = (state) => {
    return {
        fen: state.fen,
        allowMoves: !state.isGameOver,
        squareSize: 90
    }
};

const mapDispatchToProps = (dispatch) => {
    const currentPosition = () => {
        const game = new Chess();
        for(let i in EventStore) {
            game.move(EventStore[i].move)
        }
        return game.fen()
    };

    const isMoveValid = (move, fen) => {
        return (new Chess(fen)).move(move) !== null
    };

    const actionCreatorMovePiece = (from, to) => {
        const move = {
            from: from,
            to: to,
            promotion: 'q'
        };
        if(isMoveValid(move, currentPosition())) {
            return move
        }
        return null
    };

    return {
        'onMovePiece': function(piece, from, to) {
            const move = actionCreatorMovePiece(from, to);
            if(move) {
                dispatch({
                    type: 'movePiece',
                    move: move
                });
            } else {
                console.warn('Invalid move ' + from + '-' + to)
            }
        }
    }
};

const ReactChess = connect(mapStateToProps, mapDispatchToProps)(ChessDiagram);

ReactDOM.render(
    <Provider store={store}>
        <ReactChess />
    </Provider>,
    document.getElementById('chess')
);
