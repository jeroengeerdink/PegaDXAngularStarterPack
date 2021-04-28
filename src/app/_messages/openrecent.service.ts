import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenRecentService {

  private subject = new Subject<any>();
 
  sendMessage(sCaseName: string, sCaseID: string) {
      this.subject.next({ caseName: sCaseName, caseID: sCaseID});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
