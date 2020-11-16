import { EditArticleStateInterface } from '../types/editArticleState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import {
    updateArticleAction,
    updateArticleFailureAction,
    updateArticleSuccessAction,
} from './actions/updateArticle.action';
import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from './actions/getArticle.action';

const initialState: EditArticleStateInterface = {
    isLoading: false,
    article: null,
    isSubmitting: false,
    validationErrors: null,
};

const editArticleReducer = createReducer(
    initialState,
    on(updateArticleAction, (state) => ({
        ...state,
        isSubmitting: true,
    })),
    on(updateArticleSuccessAction, (state) => ({
        ...state,
        isSubmitting: false,
    })),
    on(updateArticleFailureAction, (state, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
    })),

    on(getArticleAction, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(getArticleSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        article: action.article,
    })),
    on(getArticleFailureAction, (state) => ({
        ...state,
        isLoading: false,
    })),

    on(routerNavigationAction, (state) => (state = initialState))
);

export function reducers(state: EditArticleStateInterface, action: Action) {
    return editArticleReducer(state, action);
}
