import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/errorMessage.component';

@NgModule({
    imports: [CommonModule],
    exports: [LoadingComponent],
    declarations: [LoadingComponent],
})
export class LoadingModule {}
