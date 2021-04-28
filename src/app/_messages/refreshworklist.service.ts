import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshWorkListService {

  private subject = new Subject<any>();
 
  sendMessage(sWorkList: string) {
      this.subject.next({ workList: sWorkList});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
