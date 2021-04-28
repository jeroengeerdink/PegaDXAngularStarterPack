import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloseWorkService {

  private subject = new Subject<any>();
 
  sendMessage(sWorkID: string) {
      this.subject.next({ workID: sWorkID});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
