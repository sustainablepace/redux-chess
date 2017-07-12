import {createStore} from 'redux'
import {Provider} from 'react-redux';
import ChessReducer from './game/gameReducer'
import Chess from './game/gameComponent'
import React from 'react';
import ReactDOM from 'react-dom';

const store = createStore(ChessReducer);

ReactDOM.render(
    <Provider store={store}>
        <Chess />
    </Provider>,
    document.getElementById('chess')
);
