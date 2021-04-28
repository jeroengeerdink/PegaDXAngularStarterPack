import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule, HttpResponse} from '@angular/common/http';
import { endpoints } from './endpoints';
import { ReferenceHelper } from '../_helpers/reference-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class AssignmentService {

  refHelper: ReferenceHelper = new ReferenceHelper();

  constructor(private http: HttpClient) { }


  assignmentUrl = endpoints.BASEURL + endpoints.ASSIGNMENTS;


  pxResults: Object;


  getAssignment(id) {

    let assignmentParams = new HttpParams();
    let assignmentHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      assignmentHeaders = assignmentHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      assignmentHeaders = assignmentHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    assignmentHeaders = assignmentHeaders.append('Content-Type', "application/json");


    return this.http.get(this.assignmentUrl + "/" + id,
      { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
  }
  

  getFieldsForAssignment(id, action): Observable<HttpResponse<any>> {


    let assignmentParams = new HttpParams();
    let assignmentHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      assignmentHeaders = assignmentHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      assignmentHeaders = assignmentHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    assignmentHeaders = assignmentHeaders.append('Content-Type', "application/json");

    return this.http.get(this.assignmentUrl + "/" + id + endpoints.ACTIONS +  "/" + action, 
      { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
    

  }


  performRefreshOnAssignment(id, action, refreshFor, body, pageInstr) {

    let assignmentParams = new HttpParams();
    if (refreshFor && refreshFor != "") {
      assignmentParams = assignmentParams.append('refreshFor', refreshFor);
    }

    let assignmentHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      assignmentHeaders = assignmentHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      assignmentHeaders = assignmentHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    assignmentHeaders = assignmentHeaders.append('Content-Type', "application/json");
    
    let encodedId = encodeURI(id);
    let oContent = this.refHelper.getPostContent(body);

    if (pageInstr.pageInstructions.length > 0) {
      return this.http.put(this.assignmentUrl + "/" + encodedId + endpoints.ACTIONS + "/" + action + endpoints.REFRESH, 
        { 'content' : oContent, 'pageInstructions' : pageInstr.pageInstructions },
        { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
    }
    else {
      return this.http.put(this.assignmentUrl + "/" + encodedId + endpoints.ACTIONS + "/" + action + endpoints.REFRESH, 
        { 'content' : oContent },
        { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
    }  
    
  }
  

  performActionOnAssignment(id, action, body, pageInstr) {

    let assignmentParams = new HttpParams();
    assignmentParams = assignmentParams.append('actionID', action);
    const encodedUser = localStorage.getItem("encodedUser");

    let assignmentHeaders = new HttpHeaders();
    if (localStorage.getItem("loginType") === "BASIC") {
      assignmentHeaders = assignmentHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      assignmentHeaders = assignmentHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    assignmentHeaders = assignmentHeaders.append('Content-Type', "application/json");
    
    let encodedId = encodeURI(id);
    let oContent = this.refHelper.getPostContent(body);

    if (pageInstr.pageInstructions.length > 0) {
      return this.http.post(this.assignmentUrl + "/" + encodedId, { 'content' : oContent, 'pageInstructions': pageInstr.pageInstructions },
      { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
    }
    else {
      return this.http.post(this.assignmentUrl + "/" + encodedId, { 'content' : oContent },
        { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
    }
  }

  // 8.4 and greater
  saveAssignment(id, action, body, pageInstr) {

    let assignmentParams = new HttpParams();
    assignmentParams = assignmentParams.append('actionID', action);
    assignmentParams = assignmentParams.append('saveOnly', 'true');
    const encodedUser = localStorage.getItem("encodedUser");

    let assignmentHeaders = new HttpHeaders();
    if (localStorage.getItem("loginType") === "BASIC") {
      assignmentHeaders = assignmentHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      assignmentHeaders = assignmentHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    assignmentHeaders = assignmentHeaders.append('Content-Type', "application/json");
    
    let encodedId = encodeURI(id);
    let oContent = this.refHelper.getPostContent(body);

    if (pageInstr.pageInstructions.length > 0) {
      return this.http.post(this.assignmentUrl + "/" + encodedId, { 'content' : oContent, 'pageInstructions': pageInstr.pageInstructions },
      { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
    }
    else {
      return this.http.post(this.assignmentUrl + "/" + encodedId, { 'content' : oContent },
        { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
    }
  }

  assignments() {

    let assignmentParams = new HttpParams();
    let assignmentHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      assignmentHeaders = assignmentHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      assignmentHeaders = assignmentHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    assignmentHeaders = assignmentHeaders.append('Content-Type', "application/json");

    return this.http.get(this.assignmentUrl,
      { observe: 'response', params: assignmentParams, headers: assignmentHeaders});
  }


  

}


