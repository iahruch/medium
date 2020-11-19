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
import {
    getCurrentUserAction,
    getCurrentUserFailureAction,
    getCurrentUserSuccessAction,
} from './actions/getCurrentUser.action';
import { updateCurrentUserSuccessAction } from './actions/updateCurrentUser.action';
import { logoutAction } from './actions/logout.action';

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
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
    })),

    //getCurrentUser
    on(getCurrentUserAction, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(getCurrentUserSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.currentUser,
    })),
    on(getCurrentUserFailureAction, (state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        currentUser: null,
    })),
    on(updateCurrentUserSuccessAction, (state, action) => ({
        ...state,
        currentUser: action.currentUser,
    })),
    on(logoutAction, () => ({
        ...initialState,
        isLoggedIn: false,
    }))
);

// tslint:disable-next-line:typedef
export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action);
}
