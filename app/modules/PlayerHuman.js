import Chess from 'chess.js';

class PlayerHuman {
    constructor() {
        this.move = (dispatch, fen, from, to) => {
            const game = new Chess(fen);
            if (!game.game_over()) {
                const move = {from: from, to: to, promotion: 'q'}; // always promote to queen for simplicity's sake
                dispatch({
                    type: "move",
                    move: move
                });
            }
        };
    }
}

export default PlayerHuman;