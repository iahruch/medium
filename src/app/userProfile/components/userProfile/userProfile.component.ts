import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ProfileInterface } from '../../../shared/types/profile.interface';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getUserProfileAction } from '../../store/actions/getUserProfile.action';
import {
    errorSelector,
    isLoadingSelector,
    userProfileSelector,
} from '../../store/selectors';
import { currentUserSelector } from '../../../auth/store/selectors';
import { filter, map } from 'rxjs/operators';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';

@Component({
    selector: 'mc-profile',
    templateUrl: './userProfile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
    isLoading$: Observable<any>;
    error$: Observable<any>;
    userProfileSubscription: Subscription;
    userProfile: ProfileInterface;
    slug: string;
    apiUrl: string; // какие посты фетчить зависит какой урл будет
    isCurrentUserProfile$: Observable<boolean>;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListener();
    }

    initializeValues(): void {
        this.slug = this.route.snapshot.paramMap.get('slug');
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));

        // определяем урл который будет передан для фетчас фидов. определили исходя из текущего урла
        http: this.isCurrentUserProfile$ = combineLatest(
            this.store.pipe(select(currentUserSelector), filter(Boolean)),
            this.store.pipe(select(userProfileSelector), filter(Boolean))
        ).pipe(
            map(
                ([currentUser, userProfile]: [
                    CurrentUserInterface,
                    ProfileInterface
                ]) => {
                    return currentUser.username === userProfile.username;
                }
            )
        );
    }

    initializeListener(): void {
        this.userProfileSubscription = this.store
            .pipe(select(userProfileSelector))
            .subscribe((userProfile: ProfileInterface) => {
                this.userProfile = userProfile;
            });
        this.route.params.subscribe((params: Params) => {
            //console.log('Params', params);
            this.slug = params.slug;
            this.fetchUserProfile();
        });
    }

    fetchUserProfile(): void {
        this.store.dispatch(getUserProfileAction({ slug: this.slug }));
    }
    ngOnDestroy(): void {
        this.userProfileSubscription.unsubscribe();
    }

    getApiUrl(): string {
        const isFavorited = this.router.url.includes('favorites');
        return isFavorited
            ? `/articles?favorited=${this.slug}`
            : `/articles?author=${this.slug}`;
    }
}
