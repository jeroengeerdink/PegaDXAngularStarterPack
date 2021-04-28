import { Component, OnInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GetChangesService } from '../../_messages/getchanges.service';
import { ChangeDetectorRef } from "@angular/core";


@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})


export class FieldComponent implements OnInit {
  @Input() fieldComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;
  @Input() RefType$: string;



  constructor(private gcservice: GetChangesService,
              private cdRef: ChangeDetectorRef) { 


  }

  ngOnInit() {

  }

  


}
