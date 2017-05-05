import Chess from 'chess.js';

class PlayerHuman {
    constructor(options) {
        this.store = options.store;
        this.pieceColor = options.pieceColor;
        this.move = (pieceType, initialSquare, finalSquare) => {
            const fen = this.store.getState().fen;
            const game = new Chess();
            game.load(fen);
            if (!game.game_over() && game.turn() === this.pieceColor) {
                setTimeout(() => {
                    this.store.dispatch({
                        type: "move",
                        move: { from: initialSquare, to: finalSquare }
                    });
                }, 100);
            }
        };
    }

}

export default PlayerHuman;