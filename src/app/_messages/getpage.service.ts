import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPageService {

  private subject = new Subject<any>();
 
  sendMessage(sName: string, sCaseID: string,  oPage: Object) {
      this.subject.next({ name: sName, caseID: sCaseID, page: oPage});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
