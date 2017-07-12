import Clock from './clock/clockComponent'
import Board from './board/boardComponent'
import React from 'react';

export default () => (
    <div>
        <Clock color='b'/>
        <Board />
        <Clock color='w'/>
    </div>
);