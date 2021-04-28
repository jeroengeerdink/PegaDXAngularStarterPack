import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 
@Injectable({ providedIn: 'root' })
export class GetAssignmentService {
    private subject = new Subject<any>();
 
    sendMessage(sCaseID: string, oAssignment: Object) {
        this.subject.next({ caseID: sCaseID, assignment: oAssignment });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}