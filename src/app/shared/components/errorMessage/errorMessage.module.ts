import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/errorMessage.component';

@NgModule({
    imports: [CommonModule],
    exports: [ErrorMessageComponent],
    declarations: [ErrorMessageComponent],
})
export class ErrorMessageModule {}
