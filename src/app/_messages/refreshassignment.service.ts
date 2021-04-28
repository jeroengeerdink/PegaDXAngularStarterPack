import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshAssignmentService {

  private subject = new Subject<any>();
 
  // sending 
  //  action (null, addRow, removeRow, etc)
  //  data (null, data as required for an action, presently nothing, but could include row number, etc.)
  //
  sendMessage(sAction: string, oData: any) {
      this.subject.next({ action: sAction, data: oData});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
