import { ArticleStateInterface } from '../types/articleState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from './actions/getArticle.action';

const initialState: ArticleStateInterface = {
    isLoading: false,
    error: null,
    data: null,
};
const articleReducer = createReducer(
    initialState,
    on(getArticleAction, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(getArticleSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        data: action.article,
    })),
    on(getArticleFailureAction, (state) => ({
        ...state,
        isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
);

export function reducers(state: ArticleStateInterface, action: Action) {
    return articleReducer(state, action);
}
