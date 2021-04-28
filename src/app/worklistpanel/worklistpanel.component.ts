import { Component, OnInit } from '@angular/core';
import { FormControl } from '../../../node_modules/@angular/forms';
import { RefreshWorkListService } from '../_messages/refreshworklist.service';

@Component({
  selector: 'app-worklistpanel',
  templateUrl: './worklistpanel.component.html',
  styleUrls: ['./worklistpanel.component.scss']
})
export class WorklistpanelComponent implements OnInit {

  arWorkbaskets$: Array<any> = [];
  workbaskets = new FormControl('Worklist');

  constructor(private rwlservice: RefreshWorkListService) { 

  }

  ngOnInit() {

    if (localStorage.getItem("userName")) {
      this.getWorkbaskets();
    }

  }

  getWorkbaskets() {
    let sWorkbaskets = localStorage.getItem("userWorkBaskets");
    this.arWorkbaskets$ = sWorkbaskets != undefined ? JSON.parse(sWorkbaskets) : [];


  }

  compareDropdown(value1: any, value2: any): boolean {
    const val1 = determineValues(value1);
    const val2 = determineValues(value2);

    return val1 === val2;
  }

  dropDownChanged(e) {

    this.rwlservice.sendMessage(e.value);
    
  }

}

export function determineValues(val: any): string {
  if (val.constructor.name === 'array' && val.length > 0) {
     return '' + val[0];
  }
  return '' + val;
}
