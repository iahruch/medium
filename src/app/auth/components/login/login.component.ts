import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
    isSubmittingSelector,
    validationErrorsSelector,
} from '../../store/selectors';
import { loginAction } from '../../store/actions/login.action';

@Component({
    selector: 'mc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    isSubmitting$ = this.store.pipe(select(isSubmittingSelector));

    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.loginForm = this.fb.group({
            email: ['igor0209@gmail.com', []],
            password: ['123456789', []],
        });
    }
    onSubmit() {
        this.store.dispatch(
            loginAction({ request: { user: this.loginForm.value } })
        );
    }
}
