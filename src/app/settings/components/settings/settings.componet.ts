import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { Observable, Subscription } from 'rxjs';
import { currentUserSelector } from '../../../auth/store/selectors';
import { filter } from 'rxjs/operators';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import {
    isSubmittingSelector,
    validationErrorsSelector,
} from '../../store/selectors';
import { updateCurrentUserAction } from '../../../auth/store/actions/updateCurrentUser.action';
import { CurrentUserInputInterface } from '../../../shared/types/currentUserInput.interface';
import { logoutAction } from '../../../auth/store/actions/logout.action';

@Component({
    selector: 'mc-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponet implements OnInit, OnDestroy {
    currentUser: CurrentUserInterface;
    currentUserSubscription: Subscription;
    isSubmitting$: Observable<boolean>;
    backendErrors$: Observable<BackendErrorsInterface | null>;
    form: FormGroup;

    constructor(private fb: FormBuilder, private store: Store) {}

    ngOnInit(): void {
        this.initListener();
        this.initValues();
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    initValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    initListener(): void {
        this.currentUserSubscription = this.store
            .pipe(select(currentUserSelector), filter(Boolean))
            .subscribe((currentUser: CurrentUserInterface) => {
                this.currentUser = currentUser;
                this.initForm();
            });
    }

    initForm(): void {
        this.form = this.fb.group({
            image: this.currentUser.image,
            username: this.currentUser.username,
            bio: this.currentUser.bio,
            email: this.currentUser.email,
            password: '',
        });
    }

    submit(): void {
        const currentUserInput: CurrentUserInputInterface = {
            ...this.currentUser,
            ...this.form.value,
        };

        this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
    }

    logout(): void {
        this.store.dispatch(logoutAction());
    }
}
