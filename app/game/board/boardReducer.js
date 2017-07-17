import Chess from 'chess.js';

export default (state = {fen: (new Chess()).fen()}, domainEvent) => {

    if (domainEvent.type === 'pieceMoved') {
        const game = new Chess(state.fen);
        game.move(domainEvent.move);
        return Object.assign({}, state, {
            fen: game.fen(),
            isGameOver: game.game_over()
        });
    }

    if (domainEvent.type === 'timeElapsed') {
        return Object.assign({}, state, {isGameOver: true})
    }

    return Object.assign({}, state);
};

