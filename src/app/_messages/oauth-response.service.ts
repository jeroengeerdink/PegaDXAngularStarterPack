import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class OAuthResponseService {

  private subject = new Subject<any>();

  constructor() { }

  // pass the OAuth token
  sendMessage(oToken: any) {
      this.subject.next({ token: oToken });
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
