import Chess from 'chess.js';

const ReduxChess = (state, action) => {
    const game = new Chess();
    if (state && state.fen) {
        game.load(state.fen);
    }
    if (action.move) {
        game.move(action.move);
    }
    return {
        fen: game.fen()
    };
};

export default ReduxChess;