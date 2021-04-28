import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { endpoints } from './endpoints';
import { ReferenceHelper } from '../_helpers/reference-helper';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  refHelper: ReferenceHelper = new ReferenceHelper();

  constructor(private http: HttpClient) { }


  caseUrl = endpoints.BASEURL + endpoints.CASES;
  caseTypeUrl = endpoints.BASEURL + endpoints.CASETYPES;

  pxResults: Object;

  // get a case of given id
  getCase(id) {

    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");
    caseHeaders = caseHeaders.append('Access-Control-Expose-Headers', "etag");

    return this.http.get(this.caseUrl + "/" + id,
      { observe: 'response', params: caseParams, headers: caseHeaders});   
  }

  // get a list of possible case types to create
  getCaseTypes() {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");

    return this.http.get(this.caseTypeUrl,
      { observe: 'response', params: caseParams, headers: caseHeaders});   
  }

  // get a case that is "new" 
  getCaseCreationPage(id) {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");

    return this.http.get(this.caseTypeUrl + "/" + id,
      { observe: 'response', params: caseParams, headers: caseHeaders});  
  

  }

  // create a case (with new or skip new)
  createCase(id, processName, content) {
    var caseParams = new HttpParams();

    var caseBody: any = {};
    caseBody.caseTypeID = id;
    caseBody.processID = processName != null ? processName : "";
    caseBody.content = content;
    const encodedUser = localStorage.getItem("encodedUser");

    var caseHeaders = new HttpHeaders();
    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");

    return this.http.post(this.caseUrl, caseBody,
      { observe: 'response', params: caseParams, headers: caseHeaders});   
  }

  // update a case, save to server
  updateCase(caseID, eTag, actionName, body, pageInstr) {
    var caseParams = new HttpParams();
    if (actionName && actionName != "") {
      caseParams = caseParams.append('actionID', actionName);
    }
    const encodedUser = localStorage.getItem("encodedUser");

    var caseHeaders = new HttpHeaders();
    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");
    caseHeaders = caseHeaders.append('If-Match', '"' + eTag + '"');
    
    let oContent = this.refHelper.getPostContent(body);

    let encodedId = encodeURI(caseID);

    if (pageInstr.pageInstructions.length > 0) {
      return this.http.put(this.caseUrl + "/" + encodedId,
      { 'content' : oContent, 'pageInstructions': pageInstr.pageInstructions },
      { observe: 'response', params: caseParams, headers: caseHeaders});  
    }
    else {
      return this.http.put(this.caseUrl + "/" + encodedId,
      { 'content' : oContent },
      { observe: 'response', params: caseParams, headers: caseHeaders});  
    } 
  }

  // refresh a case, post data, but no save
  refreshCase(myCase, body) {
    var caseParams = new HttpParams();
    const encodedUser = localStorage.getItem("encodedUser");

    var caseHeaders = new HttpHeaders();
    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");
    caseHeaders = caseHeaders.append('If-Match', myCase.etag);


    let oContent = this.refHelper.getPostContent(body);
    
    let encodedId = encodeURI(myCase.ID);

    return this.http.put(this.caseUrl + "/" + encodedId + endpoints.REFRESH,
     { 'content' : oContent },
     { observe: 'response', params: caseParams, headers: caseHeaders});     
  }

  // get a case with a given page (new, review, confirm)
  getPage(caseID, pageID) {

    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");

    return this.http.get(this.caseUrl + "/" + caseID + endpoints.PAGES + "/" + pageID,
      { observe: 'response', params: caseParams, headers: caseHeaders});   
  }

  // get a case and a view layout
  getView(caseID, viewID) {

    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");

    return this.http.get(this.caseUrl + "/" + caseID + endpoints.VIEWS + "/" + viewID,
      { observe: 'response', params: caseParams, headers: caseHeaders});   
  }


  cases() {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    if (localStorage.getItem("loginType") === "BASIC") {
      caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    }
    else {
      // OAUTH
      caseHeaders = caseHeaders.append('Authorization',  localStorage.getItem("oauthUser"));
    }
    caseHeaders = caseHeaders.append('Content-Type', "application/json");

    return this.http.get(this.caseUrl,
      { observe: 'response', params: caseParams, headers: caseHeaders});   
  }


}
