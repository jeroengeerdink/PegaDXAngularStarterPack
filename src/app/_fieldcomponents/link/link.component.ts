import { Component, OnInit, Input } from '@angular/core';
import { HandleActions } from "../../_actions/handleactions";
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { GetActionsService } from '../../_messages/getactions.service';
import { ReferenceHelper } from '../../_helpers/reference-helper';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() fieldComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;

  hasIcon$: boolean = false;
  hasImage$: boolean = false;
  linkLabel$: string;
  linkIcon$: string;
  linkImage$: string;
  linkIconLocation$: string;
  showLabel$: boolean = false;
  linkStyleClass$: string = "mat-button pega-link";
  reference: string;
  tooltip$: string;


  linkColor$: string = "primary";

  linkFormat$: string = "";


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

    if (this.fieldComp.disabled) {
      this.linkStyleClass$ = "mat-button pega-link-disabled";
    }

    this.linkLabel$ = this.fieldComp.control.label.replace( /\"/gi, "");
    this.linkLabel$ = this.refHelper.htmlDecode(this.linkLabel$);
    // strip begin end quotes
    this.linkLabel$ = this.linkLabel$.replace (/(^")|("$)/g, '');
    
    if (this.fieldComp.control.modes[0]) {
      switch (this.fieldComp.control.modes[0].linkImageSource) {
        case "styleclass" :
          this.hasIcon$ = true;
          this.linkIcon$ = this.fieldComp.control.modes[0].linkStyle;

          // we will translate "pi pi-" styles
          if (this.linkIcon$.indexOf("pi") >= 0) {
            this.linkIcon$ = this.linkIcon$.replace(/pi pi-/gi, "");
            this.linkIcon$ = this.linkIcon$.replace(/-/gi, "_");
          }
          this.linkIconLocation$ = this.fieldComp.control.modes[0].linkImagePosition;
          break;
        case "property" :
          break;
        case "image" :
          this.hasImage$ = true;
          this.linkImage$ = "../assets/img/" + this.fieldComp.control.modes[0].linkImage;
          this.linkIconLocation$ = this.fieldComp.control.modes[0].linkImagePosition;
          break;
        case "none":
          break;
      } 
    }

    let bFormat = this.fieldComp.control.modes[1].controlFormat ? this.fieldComp.control.modes[1].controlFormat : "";

    switch (bFormat.toUpperCase()) {
      case "STRONG" :
        this.linkFormat$ = "pega-link-strong";
        break;
      case "STANDARD" :
      case "PZHC" :
        this.linkFormat$ = "pega-link-standard";
        break;
      case "LIGHT" :
        this.linkFormat$ = "pega-link-light";
        break;

      case "RED" :
      case "WARN" :
        this.linkColor$ = "warn";
        this.linkStyleClass$ = "mat-button pega-link mat-warn";
        break;
      case "BASIC" :
        this.linkColor$ = "basic";
        break;
      case "ACCENT" :
        this.linkColor$ = "basic";
        break;
        
    }
  }

  linkClick(e) {

    if (this.fieldComp.disabled != true) {

      if (this.fieldComp.control.modes[0] && this.fieldComp.control.modes[0].linkType === "url") {
        // generate an open url
        let url = this.fieldComp.control.modes[0].linkData.replace( /\"/gi, "");;

        // doesn't go through "actions", just does a window.open
        if (url && url != "") {
          window.open(url, "_blank");
        }

        
      }
    
      this.actionsHandler.generateActions("click", this.fieldComp.control.actionSets, this.CaseID, this.fieldComp.reference);
    }


  }
}
