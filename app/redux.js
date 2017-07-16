import Chess from 'chess.js'
import {createStore} from 'redux'

const initialState = {
    board: (new Chess()).ascii(),
    fen: (new Chess()).fen(),
    moves: (new Chess()).moves(),
    isGameOver: false
};

const reducer = (state = initialState, action) => {
    console.log('reducer');
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

const store = createStore(reducer);

store.subscribe(() => {
    console.log('listener');
    document.getElementById('chess').textContent = store.getState().board
});


const randomMove = (state) => {
    const move = state.moves[Math.floor(Math.random() * state.moves.length)];
    return {
        type: 'movePiece',
        move: move
    }
};

store.subscribe(() => {
    if(store.getState().isGameOver) {
        return
    }
    setTimeout(() => {
        store.dispatch(randomMove(store.getState()));
    }, 50);
});

store.dispatch({
    type: 'init'
});
