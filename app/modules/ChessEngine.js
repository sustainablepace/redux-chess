import Chess from 'chess.js';

class ChessEngine {
    constructor(stockfish) {
        if(!stockfish || !stockfish.postMessage) {
            throw "No stockfish.";
        }
        this.stockfish = stockfish;
        this.chess = new Chess();

        this.uciCmd('uci');
    }

    uciCmd(cmd) {
        this.stockfish.postMessage(cmd);
    }

}

export default ChessEngine;