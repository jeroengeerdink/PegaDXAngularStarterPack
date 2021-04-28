import { Component, OnInit, Input } from '@angular/core';
import { GetChangesService } from '../../_messages/getchanges.service';
import { FormControl, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { interval } from "rxjs/internal/observable/interval";
import { HandleActions } from "../../_actions/handleactions";
import { GetActionsService } from '../../_messages/getactions.service';
import { ReferenceHelper } from '../../_helpers/reference-helper';

import * as moment from "moment";

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  @Input() fieldComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;
  @Input() RefType$: string;

  reference: string;
  selectedValue: string;
  displayValue$: FormControl = new FormControl('', null);
  showLabel$: boolean = false;
  tooltip$: string;

  fieldControl = new FormControl('', null);
  actionsHandler: HandleActions;


  constructor(private gcservice: GetChangesService,
              private gaservice: GetActionsService,
              private refHelper: ReferenceHelper) { 

    this.actionsHandler = new HandleActions(gaservice);

  }

  ngOnInit() {
    this.selectedValue = this.refHelper.htmlDecode(this.fieldComp.value);
    this.fieldComp.label = this.refHelper.htmlDecode(this.fieldComp.label);
    this.tooltip$ = "";
    if (this.fieldComp.control.modes.length > 0) {
      this.tooltip$ = this.refHelper.htmlDecode(this.fieldComp.control.modes[0].tooltip);
    }
    
    this.reference = this.fieldComp.reference;

    // create controlName so can be referenced from elsewhere
    this.fieldComp.controlName = this.refHelper.getUniqueControlID();

    if (this.noLabel) {
      this.fieldComp.label = "";
      this.showLabel$ = false;
    }
    else {
      if (this.fieldComp.label != "") {
        this.showLabel$ = true;
      }
      else if (this.fieldComp.label == "" && this.fieldComp.labelReserveSpace) {
        this.showLabel$ = true;
      }
    }

    if (this.fieldComp.required) {
      this.fieldControl.setValidators([Validators.required]);
    }

    this.formGroup.addControl(this.fieldComp.controlName, this.fieldControl);

    if (this.fieldComp.value != "") {
      let givenDate = new Date(moment(this.fieldComp.value, "YYYYMMDD").format("MM/DD/YYYY"));
      this.displayValue$ = new FormControl(givenDate.toISOString());
    }
    else {
      this.displayValue$ = new FormControl();
    }

    // store this format in the fieldControl
    this.fieldControl.setValue(this.displayValue$.value);


    
    if (this.fieldComp.validationMessages != "") {
      let timer = interval(100).subscribe(() => {
        this.fieldControl.setErrors({'message': true});
        this.fieldControl.markAsTouched();

        timer.unsubscribe();
        });
    
    }
    
  }

  ngOnDestroy() {
    this.formGroup.removeControl(this.fieldComp.controlName);

    this.actionsHandler = null;
    delete this.actionsHandler;
  }


  fieldDateChanged(dateValue) {
    let formattedDate = moment(dateValue, "MM/DD/YYYY").format("YYYYMMDD");

    this.fieldComp.value = formattedDate;
    this.gcservice.sendMessage(this.fieldComp.reference, formattedDate, this.CaseID, this.RefType$);

    this.actionsHandler.generateActions("change", this.fieldComp.control.actionSets, this.CaseID, this.fieldComp.reference);  
  }

  fieldChanged(e) {
    let formattedDate = moment(e.target.value, "MM/DD/YYYY").format("YYYYMMDD");
    this.gcservice.sendMessage(this.fieldComp.reference, formattedDate, this.CaseID, this.RefType$);

    this.actionsHandler.generateActions("change", this.fieldComp.control.actionSets, this.CaseID, this.fieldComp.reference);
  }

  fieldBlur(e) {
    this.actionsHandler.generateActions("blur", this.fieldComp.control.actionSets, this.CaseID, this.fieldComp.reference);
  }

  fieldClick(e) {
    this.actionsHandler.generateActions("click", this.fieldComp.control.actionSets, this.CaseID, this.fieldComp.reference);
  }



  getErrorMessage() {
    let errMessage : string = "";


    // look for validation messages for json, pre-defined or just an error pushed from workitem (400)
    if (this.fieldControl.hasError('message')) {
      errMessage = this.fieldComp.validationMessages;
    }
    else if (this.fieldControl.hasError('required')) {

      errMessage = 'You must enter a value';
    }
    else if (this.fieldControl.errors) {

      errMessage = this.fieldControl.errors.toString();

    }
 
    if (this.fieldControl.errors) {
      console.log("email error:" + JSON.stringify(this.fieldControl.errors) + ", " + errMessage + "," + this.fieldControl.valid);
      }
  

    return errMessage;
  }
}
