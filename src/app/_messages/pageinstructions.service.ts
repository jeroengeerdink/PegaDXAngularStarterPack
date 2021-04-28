import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageInstructionsService {

  private subject = new Subject<any>();
 
  // sending 
  //  action (null, addRow, removeRow, etc)
  //  data (null, data as required for an action, presently nothing, but could include row number, etc.)
  //
  sendMessage(sCaseID: string, sRefType: string, sInstructions: string, sTarget: string, sIndex: string, oContent: any) {
      this.subject.next({ caseID: sCaseID, refType: sRefType, instructions: sInstructions, target: sTarget, index: sIndex, content: oContent});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
