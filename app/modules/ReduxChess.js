import Chess from 'chess.js';

// CQRS = EventSubscriber, Flux = Store
export default (state, domainEvent) => {
    const game = new Chess(state.fen);
    game.move(domainEvent.move);
    return {
        fen: game.fen(),
        isGameOver: game.game_over()
    };
};