import { combineReducers } from 'redux';
import account from './account';
import team from './team';

export default combineReducers({
    account, team,
});