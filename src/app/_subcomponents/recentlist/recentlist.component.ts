import { Component, OnInit } from '@angular/core';
import { GetLoginStatusService } from '../../_messages/getloginstatus.service';
import { Subscription } from 'rxjs';
import { DatapageService } from '../../_services/datapage.service';
import { OpenRecentService } from '../../_messages/openrecent.service';

@Component({
  selector: 'app-recentlist',
  templateUrl: './recentlist.component.html',
  styleUrls: ['./recentlist.component.scss']
})
export class RecentlistComponent implements OnInit {


  subscription: Subscription;
  recentList$: Array<any>;

  constructor(private glservice: GetLoginStatusService,
              private dpservice: DatapageService,
              private orservice: OpenRecentService) { 

    // if we have a user, get casetypes
    if (localStorage.getItem("userName")) {
      this.updateRecentList();
    }

  }

  ngOnInit() {
    this.subscription = this.glservice.getMessage().subscribe(
      message => {
        if (message.loginStatus === 'LoggedIn') {
          this.updateRecentList();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  updateRecentList() {
    this.dpservice.getDataPage("Declare_pxRecents", {'Work' : true, 'Rule' : false}).subscribe(
      response => {
        if (response.body["pxResults"]) {
          this.recentList$ = response.body["pxResults"];
        }
      },
      err => {
        alert("Errors from get recentlist:" + err.errors);
      }
    );
  }

  openRecent(recent: any) {
    let caseID = recent.pyRecordKey;
    let caseName = recent.pyRecordID;

    this.orservice.sendMessage(caseName, caseID);


  }

}
