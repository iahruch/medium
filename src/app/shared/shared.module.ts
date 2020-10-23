import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { BackendErrorsMsgComponent } from './components/backendErrorsMsg/backendErrorsMsg.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BackendErrorsMsgComponent
  ],
  exports: [
    BackendErrorsMsgComponent
  ]
})
export class SharedModule {}
