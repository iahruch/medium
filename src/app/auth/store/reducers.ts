import { AuthStateInterface } from '../types/authState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { registerAction } from './actions/register.action';

const initialState: AuthStateInterface = {
    isSubmitting: false,
};

const authReducer = createReducer(
    initialState,
    on(registerAction, (state, action) => ({
        ...state,
        isSubmitting: true,
    }))
);

// tslint:disable-next-line:typedef
export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action);
}
