import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth';
import tasks from './tasks';

export default combineReducers({
    auth,
    tasks,
    form: formReducer,
})