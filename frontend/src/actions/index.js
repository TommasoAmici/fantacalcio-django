import axios from 'axios';
import history from '../history';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    LEAGUES
} from './types';


//const API_URL = '';
//const CLIENT_ROOT_URL = 'http://localhost:3000';


export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if (error.data.error) {
        errorMessage = error.data.error;
    } else if (error.data) {
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    if (error.status === 401) {
        dispatch({
            type: type,
            payload: 'You are not authorized to do this. Please login and try again.'
        });
        logoutUser();
    } else {
        dispatch({
            type: type,
            payload: errorMessage
        });
    }
}

export function loginUser({ email, password }) {
    return function (dispatch) {
        axios.post('/login/', { email, password })
            .then(response => {
                localStorage.setItem('user', response.data.token);
                dispatch({ type: AUTH_USER });
                history.push('/dashboard');
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}


export function registerUser({ username, email, password1, password2 }) {
    return function (dispatch) {
        axios.post('/register/', { username, email, password1, password2 }).then(response => {
            localStorage.setItem('user', response.data.token);
            dispatch({ type: AUTH_USER });
            history.push('/dashboard');
        })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function logoutUser(token) {
    return function (dispatch) {
        axios.post('/logout/', { token });
        localStorage.clear();
        dispatch(
            {
                type: UNAUTH_USER
            }
        );
        history.push('/');
    }
}

export function getLeagues() {
    return function (dispatch) {
        axios.get('/leagues/', {
            headers: { 'Authorization': localStorage.getItem('user') }
        })
            .then(response => {
                dispatch({
                    type: LEAGUES,
                    payload: response.data.content
                });
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}