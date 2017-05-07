import Chess from 'chess.js'

class PlayerComputer {
    constructor() {
        this.move = (dispatch, fen) => {
            const game = new Chess(fen);
            if (!game.game_over()) {
                const moves = game.moves();
                const move = moves[Math.floor(Math.random() * moves.length)];
                dispatch({
                    type: "move",
                    move: move
                });
            }
        };
    }

}

export default PlayerComputer;