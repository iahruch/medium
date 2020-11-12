import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getArticleAction } from '../store/actions/getArticle.action';
import { ActivatedRoute } from '@angular/router';
import {
    articleSelector,
    isLoadingSelector,
    errorSelector,
} from '../store/selectors';
import { ArticleInterface } from '../../../types/article.interface';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { currentUserSelector } from '../../../../auth/store/selectors';
import { CurrentUserInterface } from '../../../types/currentUser.interface';
import { map } from 'rxjs/operators';
import { deleteArticleAction } from '../store/actions/deleteArticle.action';

@Component({
    selector: 'mc-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
    isLoading$: Observable<boolean>;
    error$: Observable<string>;
    isAuthor$: Observable<any>;
    article: ArticleInterface | null;
    articleSubscription: Subscription;

    slug: string;
    constructor(private store: Store, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.initializeListener();
        this.initializeValues();
        this.fetchData();
    }

    initializeListener(): void {
        this.articleSubscription = this.store
            .pipe(select(articleSelector))
            .subscribe((article: ArticleInterface) => {
                this.article = article;
                //console.log(this.article);
            });
    }

    initializeValues(): void {
        this.slug = this.route.snapshot.paramMap.get('slug');
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.isAuthor$ = combineLatest(
            this.store.pipe(select(articleSelector)),
            this.store.pipe(select(currentUserSelector))
        ).pipe(
            map(
                ([article, currentUser]: [
                    ArticleInterface | null,
                    CurrentUserInterface | null
                ]) => {
                    if (!article || !currentUser) {
                        return false;
                    }
                    return article.author.username === currentUser.username;
                }
            )
        );
    }

    fetchData(): void {
        this.store.dispatch(getArticleAction({ slug: this.slug }));
    }

    ngOnDestroy(): void {
        this.articleSubscription.unsubscribe();
    }

    deleteArticle() {
        this.store.dispatch(deleteArticleAction({ slug: this.slug }));
    }
}
