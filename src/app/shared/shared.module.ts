import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackendErrorsMsgComponent } from './components/backendErrorsMsg/backendErrorsMsg.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [BackendErrorsMsgComponent, TopBarComponent],
    exports: [BackendErrorsMsgComponent, TopBarComponent],
})
export class SharedModule {}
