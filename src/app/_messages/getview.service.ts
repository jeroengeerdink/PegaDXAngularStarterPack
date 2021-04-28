import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetViewService {
  private subject = new Subject<any>();
 
  sendMessage(sName: string, sCaseID: string,  oView: Object) {
      this.subject.next({ name: sName, caseID: sCaseID, view: oView});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }


}
