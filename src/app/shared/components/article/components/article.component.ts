import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getArticleAction } from '../store/actions/getArticle.action';
import { ActivatedRoute } from '@angular/router';
import { articleSelector, isLoadingSelector, errorSelector } from '../store/selectors';
import { ArticleInterface } from '../../../types/article.interface';
import { Observable, Subscription } from 'rxjs';


@Component({
    selector: 'mc-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  isAthor$: Observable<boolean>
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
    this.articleSubscription = this.store.pipe(select(articleSelector))
        .subscribe( (article: ArticleInterface) => {
          this.article = article;
          console.log(this.article);
    });
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));



  }

  fetchData(): void {
      this.store.dispatch(getArticleAction({slug: this.slug}));
  }
}
