import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        fen: state.fen,
        squareSize: 90,
        allowMoves: true
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMovePiece: (piece, from, to) => {
            dispatch({
                type: 'move',
                move: {from: from, to: to}
            })
        }
    }
};

const ReactChess = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chessdiagram);

export default ReactChess
