import Chess from 'chess.js';

const ReduxChess = (state, action) => {
    const game = new Chess(state.fen);
    if (action.move) {
        game.move(action.move);
    }
    return {
        fen: game.fen(),
        w: state.w,
        b: state.b,
        turn: game.turn(),
        isGameOver: game.game_over()
    };
};

export default ReduxChess;