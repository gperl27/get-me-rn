import * as firebase from 'firebase'
import axios from 'axios';

export const FETCH_USER_TASKS = 'FETCH_USER_TASKS';
export const FETCHING_USER_TASKS = 'FETCHING_USER_TASKS';
export const IS_CREATING_TASK = 'IS_CREATING_TASK';
export const NOT_CREATING_TASK = 'NOT_CREATING_TASK';

const initialState = {
    isCreatingTask: false,
    fetchingUserTasks: true,
    userTasks: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_TASKS:
            return {
                ...state,
                fetchingUserTasks: false,
                userTasks: action.payload
            }

        case FETCHING_USER_TASKS: {
            return {
                ...state,
                fetchingUserTasks: true,
            }
        }

        case IS_CREATING_TASK: {
            return {
                ...state,
                isCreatingTask: true,
            }
        }

        case NOT_CREATING_TASK: {
            return {
                ...state,
                isCreatingTask: false,
            }
        }

        default:
            return state
    }
}

export const fetchUserTasks = () => {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_USER_TASKS });
        const user = getState().auth.user;
        axios.get(
            'http://d2c234c5.ngrok.io/user_tasks', { params: { user } })
            .then(res => dispatch({ type: FETCH_USER_TASKS, payload: res.data }))
            .catch(err => {
                delete axios.defaults.headers.common['Authorization'];
                firebase.auth().signOut()
            })
    }
}

export const submitCreateTask = formData => {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        const data = { ...formData, user_id: user.firebase_uid }
        axios.post(
            'http://d2c234c5.ngrok.io/task', data)
            .then(res => dispatch(fetchUserTasks()))
            .catch(err => {
                console.log(err, 'err')
                // delete axios.defaults.headers.common['Authorization'];
                // firebase.auth().signOut()
            })
    }
}