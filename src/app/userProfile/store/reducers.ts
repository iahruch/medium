import { UserProfileStateInterface } from '../types/userProfileState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
    getUserProfileAction,
    getUserProfileFailureAction,
    getUserProfileSuccessAction,
} from './actions/getUserProfile.action';

const initState: UserProfileStateInterface = {
    data: null,
    isLoading: false,
    error: null,
};

const userProfileReducer = createReducer(
    initState,
    on(getUserProfileAction, (state) => ({ ...state, isLoading: true })),

    on(getUserProfileSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        data: action.userProfile,
    })),

    on(getUserProfileFailureAction, (state, action) => ({
        ...state,
        isLoading: false,
    }))
);

export function reducers(state: UserProfileStateInterface, action: Action) {
    return userProfileReducer(state, action);
}
