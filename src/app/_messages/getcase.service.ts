import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCaseService {

  private subject = new Subject<any>();
 
  sendMessage(oCase: Object) {
      this.subject.next({ case: oCase});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
