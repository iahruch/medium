import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';


@Component({
  selector: 'mc-backend-errors-msg',
  templateUrl: './backendErrorsMsg.component.html',
  styleUrls: ['./backendErrorsMsg.component.scss'],
})
export class  BackendErrorsMsgComponent implements OnInit{

  @Input('backendMsg') backendMsgProps: BackendErrorsInterface;
  errorMessages: string[];

  constructor() {}

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendMsgProps).map( (name: string) => {
      const message = this.backendMsgProps[name].join(', ');
      return `${name} ${message}`;
    })
  }
}

