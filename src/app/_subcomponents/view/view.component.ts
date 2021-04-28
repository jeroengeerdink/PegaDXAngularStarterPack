import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})


export class ViewComponent implements OnInit {

  showView$: boolean = false;


  @Input() viewComp : any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;
  @Input() RefType$: string;

  viewName$: String;
  groups$: Array<any>;

  constructor() { 


  }

  ngOnInit() {

    if (this.viewComp) {
      if (this.viewComp.visible == undefined) {
        this.viewComp.visible = true;
      }

      if (this.viewComp.visible) {
        this.showView$ = true;
        this.groups$ = this.viewComp.groups;
        this.viewName$ = this.viewComp.name;
      } 
    }

  }

  ngOnDestroy() {

  }

 

}
