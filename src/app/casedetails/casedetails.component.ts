import { Component, OnInit, Input } from '@angular/core';
import { CaseService } from '../_services/case.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RefreshCaseService } from '../_messages/refreshcase.service';

@Component({
  selector: 'app-casedetails',
  templateUrl: './casedetails.component.html',
  styleUrls: ['./casedetails.component.scss']
})
export class CasedetailsComponent implements OnInit {

  @Input() caseID: string;

  message: any;
  subscription: Subscription;

  detailsName: string;
  groups$: any;
  showDetails: boolean = false;

  fg: FormGroup;

  constructor(private fb: FormBuilder,
              private cservice: CaseService,
              private rcservice: RefreshCaseService ) { 

    this.fg = fb.group({ hideRequired: false});
  }

  ngOnInit() {

    this.getCaseDetails();

    this.subscription = this.rcservice.getMessage().subscribe(
      message => {
        this.message = message;

        this.caseID = this.message.caseID;
        this.getCaseDetails();
        
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();    
  }

  getCaseDetails() {
    this.cservice.getView(this.caseID, "pyCaseDetails").subscribe(
      response => {
        this.detailsName = response.body["name"];
        this.groups$ = response.body["groups"];
        this.showDetails = true;

      },
      err => {
        //alert("error geting case details:" + err.message);
        // silent error to console log
        console.log("pyCaseDetails issue: " + err.message);
      }
    );
  }



}
