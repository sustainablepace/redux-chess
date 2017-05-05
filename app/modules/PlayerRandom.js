import Chess from 'chess.js'

class PlayerRandom {
    constructor(options) {
        this.store = options.store;
        this.pieceColor = options.pieceColor;
        this.move = () => {
            const fen = this.store.getState().fen;
            const game = new Chess();
            game.load(fen);
            if (!game.game_over() && game.turn() === this.pieceColor) {
                const moves = game.moves();
                const move = moves[Math.floor(Math.random() * moves.length)];
                setTimeout(() => {
                    this.store.dispatch({
                        type: "move",
                        move: move
                    });
                }, 100);
            }
        };
        this.store.subscribe(this.move);
    }

}

export default PlayerRandom;