import * as firebase from 'firebase'
import axios from 'axios';

export const FETCH_USER_TASKS = 'FETCH_USER_TASKS';
export const FETCHING_USER_TASKS = 'FETCHING_USER_TASKS';

const initialState = {
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

        default:
            return state
    }
}

export const fetchUserTasks = () => {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_USER_TASKS });
        const user = getState().auth.user;
        console.log(axios.defaults.headers.common)
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
        const user = getState('user');
        dispatch({
            type: FETCH_USER_TASKS,
            payload: [1, 2, 3, 3, 4]
        })
    }
}