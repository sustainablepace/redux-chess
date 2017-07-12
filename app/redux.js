import Chess from 'chess.js';
import { createStore } from 'redux'

/* Reducer */
const reducer = (state, action) => {
    const game = new Chess(state.fen);
    if(action.type === 'MOVE_PIECE' && action.move) {
        game.move(action.move);
    }
    return {
        fen: game.fen()
    }
};

const initialState = {
    fen: (new Chess()).fen()
};

const store = createStore(reducer, initialState);

/* Players */
const nextMove = () => {
    const fen = store.getState().fen;
    const game = new Chess(fen);
    if(!game.game_over()) {
        const moves = game.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        setTimeout(() => {
            store.dispatch({
                type: 'MOVE_PIECE',
                move: move
            });
        }, 50);
    }
};
store.subscribe(nextMove);

/* Board */
const displayBoard = () => {
    const fen = store.getState().fen;
    const game = new Chess(fen);
    document.getElementById('chess').textContent = game.ascii()
};
store.subscribe(displayBoard);


/* Initialise */
nextMove();