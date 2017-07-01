import React, {Component} from 'react';
import Chessdiagram from 'react-chessdiagram';
import { connect } from 'react-redux';
import PlayerHuman from 'Modules/PlayerHuman';

const queryModel = (state) => { // in react-redux: mapStateToProps
    return {
        fen: state.fen,
        isGameOver: state.isGameOver,
        currentPlayer: state.currentPlayer,
        allowMoves: state[state.turn] instanceof PlayerHuman,
        squareSize: 90
    }
};

const commandModel = (dispatch) => { // in react-redux: mapDispatchToProps
    return {
        onMovePiece: function(piece, from, to) {
            if(!this.isGameOver && this.allowMoves) {
                let domainEvent = this.currentPlayer.createAction(from, to);
                if(domainEvent !== null && domainEvent.type === "pieceMoved" && domainEvent.move) {
                    console.log('human player draws');
                    dispatch(domainEvent) // Flux = Dispatcher
                }
            }
            // void
        }
    }
};

export default connect(queryModel, commandModel)(Chessdiagram);
