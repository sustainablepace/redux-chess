import Chess from 'chess.js';

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
        isGameOver: game.game_over()
    };
};