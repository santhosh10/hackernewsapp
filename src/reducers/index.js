import { combineReducers } from 'redux';
import feedsReducer from './feedsReducer';

export default combineReducers({
    feeds: feedsReducer
})