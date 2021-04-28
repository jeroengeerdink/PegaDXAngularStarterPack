import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetGroupsService {
  private subject = new Subject<any>();
 
  sendMessage(oGroups: Array<Object>) {
      this.subject.next({ groups: oGroups});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }


}
