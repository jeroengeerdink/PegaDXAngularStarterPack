import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-nosupport',
  templateUrl: './nosupport.component.html',
  styleUrls: ['./nosupport.component.scss']
})
export class NosupportComponent implements OnInit {
  @Input() fieldComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;

  showLabel$: boolean = false;

  constructor() { }

  ngOnInit() {

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

  }

}
