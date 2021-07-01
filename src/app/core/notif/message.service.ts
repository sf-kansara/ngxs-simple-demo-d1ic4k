import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable()
export class ColumnMessageService {
  private readonly subject = new Subject<Message>();

  sendMessage(message: Message) {
    this.subject.next(message);
  }

  getMessage(): Observable<Message> {
    return this.subject.asObservable();
  }
}
