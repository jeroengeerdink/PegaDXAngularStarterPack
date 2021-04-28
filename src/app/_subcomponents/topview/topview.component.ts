import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { GetViewService } from '../../_messages/getview.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GetGroupsService } from '../../_messages/getgroups.service';
import * as _ from "lodash";


@Component({
  selector: 'app-topview',
  templateUrl: './topview.component.html',
  styleUrls: ['./topview.component.scss']
})


export class TopviewComponent implements OnInit {



  message: any;
  view: any;
  topName: string;
  groups$: any;
  subscription: Subscription;
  showView: boolean = false;
  refreshViewCount: number = 0;
  caseID: string = "";

  fg: FormGroup;

  @Input() CaseID: string;

  constructor(private fb: FormBuilder,
              private gvservice: GetViewService, 
              private ggservice: GetGroupsService, 
              private cd: ChangeDetectorRef) { 


    this.fg = fb.group({ hideRequired: false});


    this.showView = false;
    this.subscription = this.gvservice.getMessage().subscribe(message => {

      this.message = message;
      this.view = message.view;

      if (this.caseID === "") {
        this.caseID = this.message.caseID;
        this.topName = message.view.name;
      }
      else if (this.caseID == this.message.caseID) {
        this.topName = message.view.name;
      }

     
      if (this.view.visible && this.message.caseID === this.caseID) {
        this.showView = true;

        this.groups$ = this.view.groups;

      }

      this.CaseID = this.caseID;

    });


}

  ngOnInit() {


  }

  ngAfterViewInit() {

  }

  customFilter(object,result){
    if(object.hasOwnProperty('field'))
        result.push(object);

    for (let i=0;i<Object.keys(object).length;i++){
        if(typeof object[Object.keys(object)[i]]=="object"){
            this.customFilter(object[Object.keys(object)[i]],result);
        }
    }
  }

  addFieldsToFormGroup(arFields : Array<any>) {
    arFields.forEach( element => {

      this.fg.addControl(element.field.fieldID, new FormControl('', null));
    })
  }

  formValid(): boolean {

    this.touchAll();
    return this.fg.valid;

  }

  touchAll(): void {
    Object.values(this.fg.controls).forEach(
      control => {
          control.markAsTouched();
      }
    )   
  }


  topViewRefresh(): void {


    Object.values(this.fg.controls).forEach(
      control => {
        control.markAsTouched();

      }
    )

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}
