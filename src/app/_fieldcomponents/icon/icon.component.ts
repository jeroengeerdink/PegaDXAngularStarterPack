import { Component, OnInit, Input } from '@angular/core';
import { HandleActions } from "../../_actions/handleactions";
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { GetActionsService } from '../../_messages/getactions.service';
import { ReferenceHelper } from '../../_helpers/reference-helper';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() fieldComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;

  iconName$: string;
  hasActions$: boolean = false;
  isImage$:boolean = false;
  imageName$: string;
  showLabel$: boolean = false;
  reference: string;
  tooltip$:string;

  actionsHandler: HandleActions;


  constructor(private gaservice: GetActionsService,
              private refHelper: ReferenceHelper) { 

    this.actionsHandler = new HandleActions(gaservice);

  }

  ngOnInit() {

    this.fieldComp.label = this.refHelper.htmlDecode(this.fieldComp.label);
    this.reference = this.fieldComp.reference;
    this.tooltip$ = "";
    if (this.fieldComp.control.modes.length > 1) {
      this.tooltip$ = this.refHelper.htmlDecode(this.fieldComp.control.modes[1].tooltip);
    }


    if (this.fieldComp.control.actionSets.length > 0) {
      this.hasActions$ = true;
    }

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

    if (this.fieldComp.control.modes[1]) {
      switch (this.fieldComp.control.modes[1].iconSource) {
        case "styleclass" :
          this.iconName$ = this.fieldComp.control.modes[1].iconStyle;

          // we will translate "pi pi-" styles
          if (this.iconName$.indexOf("pi") >= 0) {
            this.iconName$ = this.iconName$.replace(/pi pi-/gi, "");
            this.iconName$ = this.iconName$.replace(/-/gi, "_");
          }

          break;
        case "property" :
          break;
        case "image" :
          this.isImage$ = true;
          this.imageName$ = "../assets/img/" + this.fieldComp.control.modes[0].iconImage;
          break;
        case "exturl" :
          break;
        case "standardIcon" :
          this.iconName$ = this.determineStandardIconName(this.fieldComp.control.modes[0].iconStandard);
          break;
        case "none":
          break;
      }
    }
  }


  
  determineStandardIconName(iconClass: string): string {

    switch(iconClass) {
      case "pxIcon":
        // blank
        return "photo";
      case "pxIconAddItem" :
        return "add_circle_outline";
      case "pxIconAddNewWork" :
        return "launch";
      case "pxIconAttachments" :
        return "attach_file";
      case "pxCancel" :
        return "cancel";
      case "pxIconContents" :
        return "visibility";
      case "pxIconDeleteItem" :
        return "delete";
      case "pxIconEnableActionSection" :
        return "launch";
      case "pxIconExpandCollapse" :
        return "add_box";
      case "pxIconExplore" :
        return "settings";
      case "pxIconFinishAssignment" :
        return "launch";
      case "pxIconGetNextWork" :
        return "move_to_inbox";
      case "pxIconHistory" :
        return "history";
      case "pxIconLocalAction" :
        return "launch";
      case "pxIconPrint" :
        return "print";
      case "pxIconReopenWorkItem" :
        return "redo";
      case "pxIconReview" :
        return "launch";
      case "pxIconSave" :
        return "save_alt";
      case "pxIconShowFlowLocation" :
        return "location_on";
      case "pxIconShowHarness" :
        return "launch";
      case "pxIconShowReopenScreen" :
        return "redo";
      case "pxIconSpellChecker" :
        return "spellcheck";
      case "pxIconUpdate" :
        return "update";
      default :
        return "";
    }
  }

  iconClick(e) {

    if (this.fieldComp.disabled != true) {
      this.actionsHandler.generateActions("click", this.fieldComp.control.actionSets, this.CaseID, this.fieldComp.reference);
    }

  }

}
