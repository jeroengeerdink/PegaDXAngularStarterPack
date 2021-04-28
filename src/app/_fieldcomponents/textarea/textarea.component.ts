import { Component, OnInit, Input } from '@angular/core';
import { GetChangesService } from '../../_messages/getchanges.service';
import { FormControl, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { interval } from "rxjs/internal/observable/interval";
import { HandleActions } from "../../_actions/handleactions";
import { GetActionsService } from '../../_messages/getactions.service';
import { ReferenceHelper } from '../../_helpers/reference-helper';


@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() fieldComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;
  @Input() RefType$: string;

  reference: string;
  selectedValue: string;
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
    this.reference = this.fieldComp.reference;
    this.tooltip$ = "";
    if (this.fieldComp.control.modes.length > 0) {
      this.tooltip$ = this.refHelper.htmlDecode(this.fieldComp.control.modes[0].tooltip);
    }

    // create controlName so can be referenced from elsewhere
    this.fieldComp.controlName = this.refHelper.getUniqueControlID();

    if (this.noLabel) {
      this.fieldComp.label = "";
      this.showLabel$ = false;
    }
    else {
      if (this.fieldComp.label != "" ) {
        this.showLabel$ = true;
      }
      else if (this.fieldComp.label == "" && this.fieldComp.labelReserveSpace) {
        this.showLabel$ = true;
      }
    }

    
    if (this.fieldComp.disabled) {
      this.fieldControl.disable();
    }

    this.formGroup.addControl(this.fieldComp.controlName, this.fieldControl);
    this.fieldControl.setValue(this.fieldComp.value);

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

  fieldChanged(e) {
    this.fieldComp.value = e.target.value;
    this.gcservice.sendMessage(this.fieldComp.reference, e.target.value, this.CaseID, this.RefType$);

    this.actionsHandler.generateActions("change", this.fieldComp.control.actionSets, this.CaseID, this.fieldComp.reference);
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

    return errMessage;
  }

}
