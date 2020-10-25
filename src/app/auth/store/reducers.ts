import { AuthStateInterface } from '../types/authState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from './actions/register.action';

import {
    loginAction,
    loginFailureAction,
    loginSuccessAction,
} from './actions/login.action';

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null,
};

const authReducer = createReducer(
    initialState,
    on(registerAction, (state) => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
    })),

    on(registerSuccessAction, (state, action) => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
    })),

    on(registerFailureAction, (state, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
    })),

    //login
    on(loginAction, (state) => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
    })),

    on(loginSuccessAction, (state, action) => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
    })),

    on(loginFailureAction, (state, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
    }))
);

// tslint:disable-next-line:typedef
export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action);
}
