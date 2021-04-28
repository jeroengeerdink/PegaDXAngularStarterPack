import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RefreshAssignmentService } from '../../_messages/refreshassignment.service';

@Component({
  selector: 'app-repeatinglayout',
  templateUrl: './repeatinglayout.component.html',
  styleUrls: ['./repeatinglayout.component.scss']
})
export class RepeatinglayoutComponent implements OnInit {

  @Input() layoutComp: any;
  @Input() formGroup: FormGroup;
  @Input() CaseID: string;

  repeatRows$: any;

  constructor(private raservice: RefreshAssignmentService) { 

  }

  ngOnInit() {

    this.repeatRows$ = this.layoutComp.rows;

  }

  addRow() {

    this.raservice.sendMessage("addRow", this.layoutComp);
  }

  removeRow() {
    this.raservice.sendMessage("removeRow", this.layoutComp);
  }

}
