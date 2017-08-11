import Chessdiagram from 'react-chessdiagram'; // https://github.com/jniemann66/react-chessdiagram/blob/master/api.md
import React from 'react';
import {connect} from 'react-redux';
import Chess from 'chess.js';


/* Presentational Component */
class MyChessdiagram extends React.Component {
    componentDidUpdate() {
        this.props.gameOver.call(this.props)
    };

    render() {
        return <Chessdiagram {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        fen: state.board.fen,
        allowMoves: !state.board.isGameOver,
        squareSize: 80
    }
};

const mapDispatchToProps = (dispatch) => {
    const isMoveValid = function (move) {
        return (new Chess(this.fen)).move(move) !== null
    };

    return {
        gameOver: function() {
            if(!this.allowMoves) {
                dispatch({
                    type: 'gameOver'
                })
            }
        },
        onMovePiece: function (piece, from, to) {
            const move = {
                from: from,
                to: to,
                promotion: 'q' // always promote to queen for simplicity's sake
            };

            if (isMoveValid.call(this, move)) { // only valid moves are domain events
                dispatch({
                    type: 'pieceMoved',
                    move: move
                })
            } else {
                console.warn('Invalid move: ' + from + ' - ' + to)
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyChessdiagram);