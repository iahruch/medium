import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { PersistanceService } from './shared/services/persistance.service';
import { GlobalFeedModule } from './globalFeed/components/global-feed/globalFeed.module';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        StoreModule.forRoot({ router: routerReducer }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        SharedModule,
        GlobalFeedModule,
    ],
    providers: [
        PersistanceService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
