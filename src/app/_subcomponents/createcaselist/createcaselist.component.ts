import { Component, OnInit } from '@angular/core';
import { CaseService } from '../../_services/case.service';
import { OpenAssignmentService } from '../../_messages/openassignment.service';
import { RefreshWorkListService } from '../../_messages/refreshworklist.service';
import { GetLoginStatusService } from '../../_messages/getloginstatus.service';
import { OpenNewCaseService } from '../../_messages/opennewcase.service';
import { ProgressSpinnerService } from '../../_messages/progressspinner.service';
import { Subscription } from 'rxjs';
import { ReferenceHelper } from '../../_helpers/reference-helper';


@Component({
  selector: 'app-createcaselist',
  templateUrl: './createcaselist.component.html',
  styleUrls: ['./createcaselist.component.scss']
})
export class CreatecaselistComponent implements OnInit {


  caseManagement: any;
  caseTypes$: Array<any>;
  displayableCaseTypes$: Array<any>;
  subscription: Subscription;

  constructor(private cservice: CaseService, 
              private oaservice: OpenAssignmentService,
              private rwlservice: RefreshWorkListService,
              private glsservice: GetLoginStatusService,
              private oncservice: OpenNewCaseService,
              private refhelper: ReferenceHelper,
              private psservice: ProgressSpinnerService) { 

    // if we have a user, get casetypes
    if (localStorage.getItem("userName")) {
      this.updateCaseTypes();
    }

  }

  ngOnInit() {
    this.subscription = this.glsservice.getMessage().subscribe(
      message => {
        if (message.loginStatus === 'LoggedIn') {
          this.updateCaseTypes();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateCaseTypes() {
    this.cservice.getCaseTypes().subscribe(
      response => {

        this.caseManagement = response.body;
        this.caseTypes$ = this.caseManagement.caseTypes;
        this.displayableCaseTypes$  = new Array();

        for (let myCase of this.caseTypes$) {
          if (this.refhelper.isTrue(myCase.CanCreate)) {
            let newCase = JSON.parse(JSON.stringify(myCase));
            if (newCase.startingProcesses != null) {
              if (newCase.startingProcesses[0]) {
                // reset name to be name in first starting case
                newCase.name = newCase.startingProcesses[0].name;
              }
            }
            this.displayableCaseTypes$.push(newCase);
          }
        }

      },
      err => {
        alert("Errors from get casetypes:" + err.errors);
      }
    );

  }

  createCaseType(caseType: any) {

    this.psservice.sendMessage(true);

    // starting with 8.5, startingProcesses can be blank or not there (Create Stage)
    // so, allow if "CanCreate" and have an "ID"
    if ((caseType.startingProcesses != null && caseType.startingProcesses[0].requiresFieldsToCreate === 'false') ||
        (this.refhelper.isTrue(caseType.CanCreate) && caseType.ID != null)) {

      let processName = "";
      // if we have starting process, use that processName otherwise now blank
      if (caseType.startingProcesses != null && caseType.startingProcesses[0].ID) {
        processName = caseType.startingProcesses[0].ID;
      }
      // skip new
      this.cservice.createCase(caseType.ID, processName, {}).subscribe(
        response => {
          // create a "row" that matches the worklist row, this way we can re-use
          // the open assignment service
          let row: any = {};
          let myCase: any = response.body;


          row["pxRefObjectKey"] = myCase.ID;
          row["pxRefObjectInsName"] = myCase.ID.split(" ")[1];
          row["pzInsKey"] = myCase.nextAssignmentID;

          this.oaservice.sendMessage(row.pxRefObjectInsName, row);
          this.rwlservice.sendMessage('Work');
         

        },
        err => {
          alert("Errors from create case:" + err.errors);
        }

      );
    }
    else {
      // new
      this.oncservice.sendMessage(caseType.ID);

    }


  }

}
