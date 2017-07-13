export default (state = {turn: 'w', timeW: 300, timeB: 300}, domainEvent) => {

    if (domainEvent.type === 'pieceMoved') {
        return Object.assign({}, state, {turn: state.turn === 'w' ? 'b' : 'w'})
    }

    if (domainEvent.type === 'timePassed') {
        return Object.assign({}, state, {
            timeW: domainEvent.color === 'w' ? state.timeW - 1 : state.timeW,
            timeB: domainEvent.color === 'b' ? state.timeB - 1 : state.timeB
        });
    }
    return state
}