import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector } from '../../store/selectors';

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    isSubmitting$ = this.store.pipe(select(isSubmittingSelector));

    constructor(private fb: FormBuilder, private store: Store) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.form = this.fb.group({
            username: ['igor', [Validators.required]],
            email: ['igor@igor.com', [Validators.email]],
            password: ['123', [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit(): void {
        this.store.dispatch(registerAction( {request: {user: this.form.value}}));
    }
}
