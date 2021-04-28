import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatapageService } from '../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { OpenAssignmentService } from '../_messages/openassignment.service';
import { RefreshWorkListService } from '../_messages/refreshworklist.service';
import { ProgressSpinnerService } from "../_messages/progressspinner.service";






@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.scss']
})
export class WorklistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  worklist$: MatTableDataSource<any>;
  works$: Object;
  headers: any;

  message: any;
  subscription: Subscription;

  displayedColumns = ['pxRefObjectInsName','pyAssignmentStatus', 'pyLabel', 'pxUrgencyAssign'];
 


  constructor(private datapage: DatapageService, 
              private oaservice: OpenAssignmentService,
              private rwlservice: RefreshWorkListService,
              private psservice: ProgressSpinnerService) { }

  ngOnInit() {

    this.getWorkList();

    this.subscription = this.rwlservice.getMessage().subscribe(message => { 
      this.message = message;


      if (this.message.workList === 'Work' || this.message.workList === "Worklist") {
        this.getWorkList();

      }
      else {
        this.getWorkBaskets(this.message.workList);
      }
    });

    

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getWorkList() {
    let worklistParams = new HttpParams().set('Work', 'true');

    let dsubscription = this.datapage.getDataPage("D_Worklist", worklistParams).subscribe(

      response => {
        this.worklist$ = new MatTableDataSource<any>(this.getResults(response.body));
        this.headers = response.headers;

        this.worklist$.paginator = this.paginator;
        this.worklist$.sort = this.sort;

        dsubscription.unsubscribe();
        
      },
      err => {
        alert("Error form worklist:" + err.errors);
      }
    );

    

  }

  getWorkBaskets(workbasket) {
    let workbasketParams = new HttpParams().set('WorkBasket', workbasket);

    let dsubscription = this.datapage.getDataPage("D_WorkBasket", workbasketParams).subscribe(

      response => {
        this.worklist$ = new MatTableDataSource<any>(this.getResults(response.body));
        this.headers = response.headers;

        this.worklist$.paginator = this.paginator;

        dsubscription.unsubscribe();
      },
      err => {
        alert("Error form workbasket:" + err.errors);
      }
    );
    
    

  }

  getResults(data) {

    return data.pxResults;
  }

  openAssignment(row) {
    this.psservice.sendMessage(true);
    this.oaservice.sendMessage(row.pxRefObjectInsName, row);

  }
}
