import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReferenceHelper } from '../../_helpers/reference-helper';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Input() layoutComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;
  @Input() RefType$: string;

  showLayout: boolean = false;
  groupFormat: string = "";
  layoutFormat: string = "";
  layoutTitle = "";
  layoutContainerFormat$ = "";

  constructor(private refHelper: ReferenceHelper) { 

    this.showLayout = false;
  }

  ngOnInit() {

    this.layoutTitle = this.layoutComp.title;
    if (this.layoutComp.title && this.layoutComp.title != "") {
      this.layoutTitle = this.refHelper.htmlDecode(this.layoutComp.title);
    }
        
    if (this.layoutComp.visible == undefined) {
      this.layoutComp.visible = true;
    }

    if (this.layoutComp.visible) {
      this.showLayout = true;
      if (this.layoutComp.groupFormat) {
        this.groupFormat = this.layoutComp.groupFormat;
      }
      if (this.layoutComp.layoutFormat) {
        this.layoutFormat = this.layoutComp.layoutFormat;
      }

    }

    // formats
    let sFormat = this.layoutComp.containerFormat ? this.layoutComp.containerFormat : "";
    switch (sFormat.toUpperCase()) {
      case "WARNINGS" :
        this.layoutContainerFormat$ = "pega-layout-format-warnings";
        break;
    }

  }



}
