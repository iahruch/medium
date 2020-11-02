import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'mc-error-message',
    template: '<div>{{messageProps}}</div>',
})
export class ErrorMessageComponent implements OnInit {
    @Input('message') messageProps: string = 'SOmething went wrong';

    ngOnInit(): void {}
}
