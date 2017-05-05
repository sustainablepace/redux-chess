import Chess from 'chess.js';

const ReduxChess = (state, action) => {
    const fen = state && state.fen;
    const game = new Chess();
    if (fen) {
        game.load(fen);
    }
    if (action.move) {
        game.move(action.move);
    }
    return {
        fen: game.fen(),
        allowMoves: true
    };
};

export default ReduxChess;