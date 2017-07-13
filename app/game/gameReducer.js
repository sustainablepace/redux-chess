import {combineReducers} from 'redux'
import board from './board/boardReducer'
import clock from './clock/clockReducer'

export default combineReducers({board, clock})