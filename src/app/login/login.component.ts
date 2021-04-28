import { Component, OnInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { UserService } from "../_services/user.service";
import { GetLoginStatusService } from "../_messages/getloginstatus.service";
import { DatapageService } from "../_services/datapage.service";
import { ProgressSpinnerService } from "../_messages/progressspinner.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { OAuthResponseService } from '../_messages/oauth-response.service';
import { Subscription, Observable, interval } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() isMashup$: boolean;

  loginData: any = {};
  clientID$: string;


  // default
  loginType$: string;

  oAuthResponseSubscription: Subscription;
  

  constructor(private uservice: UserService, 
              private glsservice: GetLoginStatusService,
              private dservice: DatapageService,
              private snackBar: MatSnackBar,
              private psservice: ProgressSpinnerService,
              private oarservice: OAuthResponseService ) {

    if (localStorage.getItem('loginType') ) {
      this.loginType$ = localStorage.getItem('loginType');
    }
    else {
      this.loginType$ = "BASIC";
    }

  }

  userNameControl = new FormControl('', null);
  passwordControl = new FormControl('', null);
  clientIDControl = new FormControl('', null);




  ngOnInit() {


    this.initLogin();

    this.oAuthResponseSubscription = this.oarservice.getMessage().subscribe(message => {

      if (message.token) {

        this.loadFromOAuth(message.token);

       
      }

    });

    
  }

  initLogin() {
    this.clientID$ = localStorage.getItem("clientID");
    if (this.clientID$) {
      this.clientIDControl.setValue(this.clientID$);
    }

    this.userNameControl.setValue('');
    this.passwordControl.setValue('');
  }



  loadFromOAuth(token: any) {
    this.psservice.sendMessage(true);

    let operatorParams = new HttpParams()

    this.dservice.getDataPage("D_OperatorID", operatorParams).subscribe(
      response => {

        let operator: any = response.body;
        localStorage.setItem("loginType", this.loginType$);
        localStorage.setItem("userFullName", operator.pyUserName);
        localStorage.setItem("userAccessGroup", operator.pyAccessGroup);
        localStorage.setItem("userWorkGroup", operator.pyWorkGroup);
        localStorage.setItem("userWorkBaskets", JSON.stringify(operator.pyWorkBasketList));

        this.psservice.sendMessage(false);
        this.glsservice.sendMessage("LoggedIn");
      },
      err => {
        let sError = "Errors getting data page: " + err.message;
        let snackBarRef = this.snackBar.open(sError, "Ok");
      });
  }

  hasToken() {


    return this.uservice.verifyHasTokenOauth();



  }


  doLogin() {
    // delay, so on change for password value can get in

    let timer = interval(100).subscribe(() => {
      this.attemptLogin();
      timer.unsubscribe();
      });

  }

  attemptLogin() {

    localStorage.setItem("loginType", this.loginType$);

    if (this.loginType$ === "BASIC") {
      this.psservice.sendMessage(true);

      this.uservice.login(this.loginData.userName, this.loginData.password).subscribe(
        response => {
          if (response.status == 200) {
            let operatorParams = new HttpParams()
  
            this.dservice.getDataPage("D_OperatorID", operatorParams).subscribe(
              response => {
  
                
  
                let operator: any = response.body;
                localStorage.setItem("loginType", this.loginType$);
                localStorage.setItem("userFullName", operator.pyUserName);
                localStorage.setItem("userAccessGroup", operator.pyAccessGroup);
                localStorage.setItem("userWorkGroup", operator.pyWorkGroup);
                localStorage.setItem("userWorkBaskets", JSON.stringify(operator.pyWorkBasketList));
                

                this.psservice.sendMessage(false);
                this.glsservice.sendMessage("LoggedIn");
                

                
              },
              err => {
                this.psservice.sendMessage(false);
  
                let sError = "Errors getting data page: " + err.message;
                let snackBarRef = this.snackBar.open(sError, "Ok");
              }
            );
  
  
  
            
          }
        },
        err => {
  
          let snackBarRef = this.snackBar.open(err.message, "Ok");
          this.glsservice.sendMessage("LoggedOut");
          localStorage.clear();
        }
      );

    }
    else if (this.loginType$ === "OAUTH") {

        this.clientID$ = localStorage.getItem("clientID");
        //localStorage.setItem("clientID", this.clientID$);
        this.uservice.loginOauth(this.clientID$);


    }

    
  }

  fieldChanged(e) {
    this.loginData[e.target.id] = e.target.value;

  }

  clientIDChanged(e) {
    localStorage.setItem(e.target.id, e.target.value);
  }

  loginTypeChanged(e) {
    this.loginType$ = e.value;

    localStorage.setItem("loginType", this.loginType$);
    this.clientID$ = localStorage.getItem("clientID");


  }


}
