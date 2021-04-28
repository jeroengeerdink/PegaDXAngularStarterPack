import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReferenceHelper } from '../../_helpers/reference-helper';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent implements OnInit {


  @Input() captionComp: any;
  @Input() fg: FormGroup;

  captionValue$: string;
  captionFormat$: string;

  constructor(private refHelper: ReferenceHelper) { 

  }

  ngOnInit() {

    this.captionValue$ = this.refHelper.htmlDecode(this.captionComp.value);
    // replace spaces with "-"
    this.captionFormat$ = this.captionComp.control.format.replace(/\s/gi, "-");


  }

}
