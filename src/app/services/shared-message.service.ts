import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models';

@Injectable()
export class SharedMessageService {
  private readonly subject = new Subject<Message>();

  sendMessage(message: Message) {
    this.subject.next(message);
  }

  getMessage(): Observable<Message> {
    return this.subject.asObservable();
  }
}
