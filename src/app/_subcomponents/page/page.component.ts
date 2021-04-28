import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { CaseService } from '../../_services/case.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() pageID: string;
  @Input() caseID: string;

  pageName$: string;
  groups$: any;
  isLoaded: boolean = false;

  fg: FormGroup;

  constructor(private fb: FormBuilder,
              private cservice: CaseService, 
              private cdRef: ChangeDetectorRef) { 


    this.fg = fb.group({ hideRequired: false});

  }

  ngOnInit() {
    
    this.cservice.getPage(this.caseID, this.pageID).subscribe(
      response => {
        let page: any = response.body;

        this.pageName$ = page.name;
        this.groups$ = page.groups;
        this.isLoaded = true;

        this.cdRef.detectChanges();

      },
      err => {
        alert("Errors from get page:" + err.errors);
      }
    );

  }

}
