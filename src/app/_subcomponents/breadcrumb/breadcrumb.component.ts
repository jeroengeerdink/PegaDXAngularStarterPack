import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() CurrentCase: any;
  
  stages$: Array<any>;

  constructor() { 

  }

  ngOnInit() {


  }

  ngOnChanges()	{
    this.stages$ = this.CurrentCase.stages;
    let stageSize = this.CurrentCase.stages.length;
    let count = 0;
    for (let oStage of this.stages$) {

      if (oStage.name === this.CurrentCase.content.pxCurrentStageLabel) {
        oStage["currentStage"] = true;
      }
      else {
        oStage["currentStage"] = false;
      }
      count++;
      if (count < stageSize) {
        oStage["last"] = false;
      }
      else {
        oStage["last"] = true;
      }
     } 
  }


}
