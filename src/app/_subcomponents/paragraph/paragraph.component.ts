import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],

})
export class ParagraphComponent implements OnInit {

  @Input() paragraphComp: any;

  paragraphValue$: string;

  constructor() { }

  ngOnInit() {


    // right now, putting the string into "innerHTML", with Angular sanatizes it, and removes any styles
  
    // to get this to work, need to send this.paragraphValues$ through a "pipe".  The pipe "safeHtml" calls
    // bypassSecurityTrustHtml.  So far, has to go through a pipe.
    this.paragraphValue$ = unescape(this.paragraphComp.value);
 

  }



}




