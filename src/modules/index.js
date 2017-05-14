import { combineReducers } from 'redux';

import memo from './memo';
import ui from './ui';
import { penderReducer } from 'redux-pender';


export default combineReducers({
    memo,
    ui,
    pender: penderReducer
})