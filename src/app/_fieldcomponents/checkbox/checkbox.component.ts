import { Component, OnInit, Input } from '@angular/core';
import { GetChangesService } from '../../_messages/getchanges.service';
import { FormControl, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { HandleActions } from "../../_actions/handleactions";
import { GetActionsService } from '../../_messages/getactions.service';
import { ReferenceHelper } from '../../_helpers/reference-helper';


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() fieldComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;
  @Input() RefType$: string;

  reference: string;
  selectedValue: string;

  valueReadonly$: string;
  showLabel$: boolean = false;
  tooltip$: string;

  isChecked$: boolean = false;
  checkboxLabelPos$: string = "after";

  fieldControl = new FormControl('', null);
  actionsHandler: HandleActions;

  constructor(private gcservice: GetChangesService,
              private gaservice: GetActionsService,
              private refHelper: ReferenceHelper) { 

    this.actionsHandler = new HandleActions(gaservice);

  }

  ngOnInit() {
    this.selectedValue = this.fieldComp.value;
    this.reference = this.fieldComp.reference;

    this.fieldComp.label = this.refHelper.htmlDecode(this.fieldComp.label);
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
      if (this.fieldComp.label != "" && this.fieldComp.showLabel) {
        this.showLabel$ = true;
      }
      else if (this.fieldComp.label == "" && this.fieldComp.showLabel && this.fieldComp.labelReserveSpace) {
        this.showLabel$ = true;
      }
    }

    if (this.fieldComp.value === 'true' || this.fieldComp.value == true) {
      this.isChecked$ = true;
    }
    else {
      this.isChecked$ = false;
    }

    this.valueReadonly$ = this.isChecked$ ? "Yes" : "No";

    // set checkbox via formcontrol
    this.fieldControl.setValue(this.isChecked$);

    // caption
    this.fieldComp.control.label = this.refHelper.htmlDecode(this.fieldComp.control.label);

    if (this.fieldComp.control.modes[0].captionPosition === "right") {
      this.checkboxLabelPos$ = "after";
    }
    else {
      this.checkboxLabelPos$ = "before";
    }

    if (this.fieldComp.required) {
      this.fieldControl.setValidators([Validators.required]);
    }

    if (this.fieldComp.disabled) {
      this.fieldControl.disable();
    }

    this.formGroup.addControl(this.fieldComp.controlName, this.fieldControl);

    this.fieldControl.setValue(this.isChecked$);
  
 
  }

  ngOnDestroy() {
    this.formGroup.removeControl(this.fieldComp.controlName);

    this.actionsHandler = null;
    delete this.actionsHandler;
  }

  fieldChanged(e) {
    this.fieldComp.value = e.checked;
    this.gcservice.sendMessage(this.fieldComp.reference, e.checked, this.CaseID, this.RefType$);

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
    if (this.fieldComp.validationMessages != "") {
      errMessage = this.fieldComp.validationMessages;
    }
    else if (this.fieldControl.hasError('required')) {
      errMessage = 'You must enter a value';
    }

    return errMessage;
  }

}
