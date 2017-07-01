import Chess from 'chess.js';
import PlayerComputer from 'Modules/PlayerComputer';

// CQRS = EventSubscriber, Flux = Store
export default (state, domainEvent) => {
    const game = new Chess(state.fen);
    if (domainEvent.type === "pieceMoved" && domainEvent.move) {
        game.move(domainEvent.move);
    }
    return {
        fen: game.fen(),
        w: state.w,
        b: state.b,
        turn: game.turn(),
        isGameOver: game.game_over(),
        isComputerTurn: state[game.turn()] instanceof PlayerComputer,
        currentPlayer: state[game.turn()]
    };
};