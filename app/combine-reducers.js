import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import ChessReducer from './game/gameReducer'
import ChessComponent from './game/gameComponent'

const store = createStore(ChessReducer);

ReactDOM.render(
    <Provider store={store}>
        <ChessComponent />
    </Provider>,
    document.getElementById('chess')
);
