import { Action, createReducer, on } from '@ngrx/store';
import { PopularTagsStateInterface } from '../types/popularTagsState.interface';
import {
    getPopularTagsAction,
    getPopularTagsActionSuccess,
} from './actions/getPopularTags.action';

const initialState = {
    loading: false,
    error: null,
    data: null,
};

export const popularTagsReducer = createReducer(
    initialState,
    on(getPopularTagsAction, (state) => ({
        ...state,
        loading: true,
    })),
    on(getPopularTagsActionSuccess, (state, action) => ({
        ...state,
        loading: false,
        data: action.popularTags,
    })),
    on(getPopularTagsActionSuccess, (state) => ({
        ...state,
        loading: false,
    }))
);

export function reducers(state: PopularTagsStateInterface, action: Action) {
    return popularTagsReducer(state, action);
}
