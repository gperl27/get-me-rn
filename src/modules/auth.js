export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

const initialState = {
    user: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            }

        case LOGGED_OUT:
            return {
                ...state,
                user: false,
            }

        default:
            return state
    }
}

export const loggedIn = user => {
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export const loggedOut = () => {
    return {
        type: LOGGED_OUT,
    }
}