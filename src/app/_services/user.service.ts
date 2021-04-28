import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { endpoints,loginBoxType} from './endpoints';
import { UserManager, Log } from 'oidc-client';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { OAuthResponseService } from '../_messages/oauth-response.service';
import { interval } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  authUrl = endpoints.BASEURL + endpoints.AUTH;
  oAuthJSO: any;
  userManager: any;
  userManagerConfig: any;

 



  constructor(private http: HttpClient,
              private oarservice: OAuthResponseService) { 

    let oAuthConfig: any = endpoints.OAUTHCFG;


    this.userManagerConfig = oAuthConfig ? {
      /* client_id: oAuthConfig.client_id,*/
      client_id: localStorage.getItem("clientID"),
      redirect_uri: oAuthConfig.loginExperience == loginBoxType.Main ?
          `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/` : "",
      response_type: 'code',
      scope: 'openid profile',
      authority: oAuthConfig.authority,
      silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
      automaticSilentRenew: true,
      filterProtocolClaims: true,
      loadUserInfo: false,
      metadata: {
        authorization_endpoint: oAuthConfig.authorization,
        token_endpoint: oAuthConfig.token
      }
    } : null;
    
    // Enable next two lines to get detailed console logging for oidc-client library
    //Log.logger = console;
    //Log.level = Log.DEBUG;
    this.userManager = this.userManagerConfig ? new UserManager(this.userManagerConfig) : null;
    

    if (this.userManager) {
      if (window.location.href.indexOf("?code=") != -1 ) {
        this.userManager.signinRedirectCallback(window.location.href)
          .then(
            (user) => {
              this.setToken(user);
              this.oarservice.sendMessage(user);

            }
          )
          .catch( (e) => {alert(e);});
      }
    }




}


  login(userName: string, password: string) {
    const encodedUser = btoa(userName + ":" + password);

    let authParams = new HttpParams();
    let authHeaders = new HttpHeaders();
    authHeaders = authHeaders.append('Authorization', 'Basic ' + encodedUser);

    localStorage.setItem("userName", userName);
    localStorage.setItem("encodedUser", encodedUser);


    return this.http.get(this.authUrl + "/",
      { observe: 'response', params: authParams, headers: authHeaders});     


  }

  loginOauth(clientID: string) {

    this.userManagerConfig.client_id = clientID;
    this.userManager.signinRedirect();


  }

  verifyHasTokenOauth() {
 
  }

  


  setToken(token: any) {
    const authToken = token.token_type + " " + token.access_token;
    localStorage.setItem("oauthUser", authToken);
    return authToken;
  }

  logoutOuath() {
    localStorage.removeItem("oauthUser");
 

    if (this.userManagerConfig) {
      this.userManagerConfig
        .getUser()
          .then( (user) => {
          if( user ) {
            this.userManager.removeUser(user);
            if( user.access_token ) {
              // Remove the token if Pega supports that for public clients (see commented out code lower in method)
              // Could either just let the access token expire or could revoke
              // If revoking, the authorization header for the revoke endpoint should be client_id:client_secret
              // Now need to invoke endpoints to kill tokens (if we ever get a refresh token...would need to kill it as well)
              // Tried passing in regular bearer token--didnt' work
              // Pega Infinity 8.5 is not presently supporting revoking "Public" tokens via the POST /revoke endpoint...so
              //  don't configure a remove endpoing
  /*          
              return axios
                .post(oAuthConfig.revoke,
                {
                  token: accessTkn
                },
                {
                  headers: {
                    'Authorization': 'Basic ' + btoa(oAuthConfig.client_id + ':')
                  }
                })
                .then( (response) => {
                  return Promise.resolve();
                })
                .catch( (error) => {
                  getError(error);
                  // Don't reject the promise (rather treat errors even as success)
                  return Promise.resolve();
                });
  */
            } 
           }

        })
      }

    }


}
