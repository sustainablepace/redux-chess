import { connect } from 'react-redux';
import Chessdiagram from 'react-chessdiagram';

const queryModel = (state) => { // in react-redux: mapStateToProps
    return {
        fen: state.fen,
        allowMoves: !state.isGameOver,
        squareSize: 90
    }
};

const commandModel = (dispatch) => { // in react-redux: mapDispatchToProps
    return {
        onMovePiece: (piece, from, to) => {
            const domainEvent = {
                type: "pieceMoved",
                move: {
                    from: from,
                    to: to,
                    promotion: 'q' // always promote to queen for simplicity's sake
                }
            };
            dispatch(domainEvent) // Flux = Dispatcher
        }
    }
};

export default connect(queryModel, commandModel)(Chessdiagram);
