import React from 'react';
import ReactDOM from 'react-dom';
import ReactChess from 'Modules/ReactChess';
import ReduxChess from 'Modules/ReduxChess';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

const store = createStore(ReduxChess, {});

ReactDOM.render(
    <Provider store={store}>
        <ReactChess/>
    </Provider>,
    document.getElementById('chessboard')
);