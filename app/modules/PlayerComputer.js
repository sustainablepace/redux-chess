import Chess from 'chess.js'

class PlayerComputer {
    constructor() {
        this.createAction = (fen) => {
            const game = new Chess(fen);
            if (!game.game_over()) {
                const moves = game.moves();
                const move = moves[Math.floor(Math.random() * moves.length)];
                return {
                    type: "pieceMoved",
                    move: move
                };
            }
            return null;
        };
    }

}

export default PlayerComputer;