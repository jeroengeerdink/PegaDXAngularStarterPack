import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/*
* Current possible actions:
*
* refresSection - {}
* setValue - { key: string, value: string}
* post - {}
* takeAction - { actionID : string, }
* runScript - { functionName: string, functionParameters: []}
* openUrlInWindow - { urlBase: string, windowNmae: string, windowOptions: string}
*
*/


export class GetActionsService {

  private subject = new Subject<any>();
 
  sendMessage(sActionName: string, oAction: Object, sCaseID: string, sReference: string) {
      this.subject.next({ actionName: sActionName, action: oAction, caseID: sCaseID, reference: sReference });
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
