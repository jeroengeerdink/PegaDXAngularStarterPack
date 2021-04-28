import { Component, OnInit, Input, ModuleWithComponentFactories } from '@angular/core';

import * as moment from "moment";
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { ReferenceHelper } from '../../_helpers/reference-helper';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  formattedValue$: string;
  format$: string = "text";
  formattedUrl$: string = "";

  @Input() fieldComp: any;
  @Input() noLabel: boolean;
  @Input() CaseID: string;
  @Input() RefType$: string;

  showLabel$: boolean = false;
 

  constructor(private refHelper: ReferenceHelper) { }

  ngOnInit() {
    this.formattedValue$ = this.refHelper.htmlDecode(this.fieldComp.value);
    this.fieldComp.label = this.refHelper.htmlDecode(this.fieldComp.label);

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

  


    if (this.fieldComp.readOnly === true) {
      let modes1 = this.fieldComp.control.modes[1];
      let formatType = modes1.formatType;
      let sVal = this.fieldComp.value;

      this.format$ = formatType;

      if (formatType != undefined) {

        switch (formatType.toLowerCase()) {
          case "none" :
            break;
          case "date" :
            this.formattedValue$ = this.generateDate(sVal, modes1.dateFormat);
            break;
          case "datetime" :
            this.formattedValue$ = this.generateDateTime(sVal, modes1.dateTimeFormat);
            break;
          case "email" :
            break;
          case "number" :
            this.formattedValue$ = this.generateNumber(sVal, modes1);
            break;
          case "tel" :
            this.formattedValue$ = this.generatePhoneNumber(sVal);
            break;
          case "text" :
            this.formattedValue$ = this.generateText(sVal, modes1);
            break;
          case "truefalse" :
            this.formattedValue$ = this.generateTrueFalse(sVal, modes1);
            break;
          case "url" :
            this.formattedUrl$ = this.generateUrl(sVal);
            break;
          case "advancedtext" :
            break;
          
        }
      }
    }

  }


  generateUrl(sVal) {

    if (sVal.indexOf("https://") == 0 || sVal.indexOf("http://") == 0) {

    }
    else {
      // assume no http
      sVal = "http://" + sVal;
    }

    return sVal;
  }

  generateText(sText, modes) {
    if (modes.autoPrepend != "") {
      sText = modes.autoPrepend + sText;
    }
    if (modes.autoAppend != "") {
      sText = sText + modes.autoAppend;
    }

    return sText;
  }

  generatePhoneNumber(sNum) {
    let locale = navigator.language;

    switch (locale) {
      case "en-US" :
      case "es-US" :
      case "en-CA" :
      case "es-MX" :
        let formattedNum = "";
        let phoneLen = sNum.length;
        if (phoneLen == 11) {
          formattedNum = sNum.substring(0,1) + "-"
          sNum = sNum.substring(1);
        }
        if (sNum.length == 10) {
          formattedNum += sNum.substring(0, 3) + "-" + sNum.substring(3, 6) + "-" + sNum.substring(6);
          sNum = formattedNum;
        }
        break;
    }

    return sNum;
  }

  generateNumber(sNum, modes) {
    switch (modes.numberSymbol) {
      case "currency" :
        return this.generateCurrency(sNum, modes);
      case "none" :
        let locale = navigator.language;
        let sDecimal = modes.decimalPlaces;
        return new Intl.NumberFormat(locale, { minimumFractionDigits: sDecimal }).format(sNum);
    }

    return sNum;
  }

  generateCurrency(sNum, modes) {

    // ignoring most of the settings, but you get the idea

    let locale = navigator.language;

    let sCurrency = "USD";
    switch (locale) {
      case "en-US" :
      case "es-US" :
        sCurrency = "USD";
        break;
      case "en-CA" :
      case "fr-CA" :
        sCurrency = "CAD";
        break;
      case "fr-FR":
      case "es-ES":
      case "de-DE":
        sCurrency = "EUR";
        break;
      case "en-GB":
        sCurrency = "GBP";
        break;
    }

    let sDecimal = modes.decimalPlaces;
    let sDisplay = modes.currencySymbol;
    switch (sDisplay) {
        case "currencySymbol":
          sDisplay = "symbol";
          break;
        case "currencyCode":
          sDisplay = "code";
          break;
        case "currencyName":
          sDisplay = "name";
          break;
    }

    let props = {
      style: "currency",
      currency: sCurrency,
      currencyDisplay: sDisplay,
      minimumFractionDigits: sDecimal
    }

    let formatter = new Intl.NumberFormat(locale, props);

    return formatter.format(sNum);




  }


  generateTrueFalse(tfVal, modes) {
    if (tfVal === "true") {
      return modes.trueLabel;
    }
    else return modes.falseLabel;
  }

  generateDate(dateVal, dateFormat) {
    let sReturnDate = dateVal;


    // if date has a ".", then of the format YYYMMDD[T]HHmmss[.]SSS Z, need to change to YYYYMMDD
    if (dateVal.indexOf(".") >= 0) {
      dateVal = moment(dateVal.replace("GMT", "+0000"), "YYYYMMDD[T]HHmmss[.]SSS Z").format("YYYYMMDD");
      sReturnDate = dateVal;
    }


    switch (dateFormat) {
      case "Date-Short" :
        // 1/1/01
        sReturnDate = moment(dateVal).format("M/D/YY");
        break;
      case "Date-Short-YYYY":
        // 1/1/2001
        sReturnDate = moment(dateVal).format("M/D/YYYY");
        break;
      case "Date-Short-Custom":
        // 01/01/01
        sReturnDate = moment(dateVal).format("MM/DD/YY");
        break;
      case "Date-Short-Custom-YYYY":
        // 01/01/2001
        sReturnDate = moment(dateVal).format("L");
        break;
      case "Date-Medium":
        // Jan 1, 2001
        sReturnDate = moment(dateVal).format("ll");
        break;
      case "Date-DayMonthYear-Custom":
        // 01-Jan-2001
        sReturnDate = moment(dateVal).format("DD-MMM-YYYY");
        break;
      case "Date-Full":
        // Monday, January 1, 2001
        sReturnDate = moment(dateVal).format("dddd, MMMM D, YYYY");
        break;
      case "DateTime-Frame":
      case "DateTime-Frame-Short":
        // 2 days, 5 hours ago
        sReturnDate = moment(dateVal.replace("GMT", "+0000"), "YYYYMMDD[T]HHmmss[.]SSS Z").fromNow();
        break;
      case "Date-Long":
        // January 1, 2001
        sReturnDate = moment(dateVal).format("MMMM D, YYYY");
        break;
      case "Date-ISO-8601":
        // 2001/01/01 y/m/d
        sReturnDate = moment(dateVal).format("YYYY/MM/DD");
        break;
      case "Date-Gregorian-1":
        // 01 January, 2001
        sReturnDate = moment(dateVal).format("DD MMMM, YYYY");
        break;
      case "Date-Gregorian-2":
        // January 01, 2001
        sReturnDate = moment(dateVal).format("MMMM DD, YYYY");
        break;
      case "Date-Gregorian-3":
        // 2001, January 01
        sReturnDate = moment(dateVal).format("YYYY, MMMM DD");
        break;
      case "DateTime-Custom":
        break;
    }

    return sReturnDate;
  }

  generateDateTime(dateTimeVal, dateFormat) {
    let sReturnDate = dateTimeVal;


    dateTimeVal = dateTimeVal.replace("GMT", "+0000")

    switch (dateFormat) {
      case "DateTime-Short" :
        // 1/1/01 1:00 AM
        //sReturnDate = moment(dateTimeVal, moment.ISO_8601, true).format("M/D/YY h:mm a");
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("M/D/YY h:mm A");
        break;
      case "DateTime-Short-Custom":
        // 01/01/01 01:00 AM
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("MM/DD/YY hh:mm A");
        break;
      case "DateTime-Short-YYYY-Custom":
        // 01/01/2001 01:00 AM
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("M/D/YYYY hh:mm A");
        break;
      case "DateTime-Short-YYYY":
        // 1/1/2001 1:00 AM
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("M/D/YYYY h:mm A");
        break;
      case "DateTime-Medium":
        // Jan 1, 2001 1:00:00 AM
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("MMM D, YYYY h:mm:ss A");
        break;
      case "DateTime-Long":
        // January 1, 2001 1:00:00 AM
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("MMMM D, YYYY h:mm:ss A");
        break;
      case "DateTime-DayMonthYear-Custom":
        // 01-Jan-2001 1:00:00 AM
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("DD-MMM-YYYY h:mm:ss A");
        break;
      case "DateTime-Full":
        // Monday, January 1, 2001 1:00 AM EDT
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("dddd, MMMM D, YYYY h:mm A Z");
        break;
      case "DateTime-Frame":
      case "DateTime-Frame-Short":
        // 2 days, 5 hours ago
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").fromNow();
        break;
      case "DateTime-ISO-8601":
        // 2001/01/01 1:00:00 AM     y/m/d
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("YYYY/MM/DD h:mm:ss a");
        break;
      case "DateTime-Gregorian-1":
        // 01 January, 2001 1:00:00 AM 
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("DD MMMM, YYYY h:mm:ss a");
        break;
      case "DateTime-Gregorian-2":
        // January 01, 2001 1:00:00 AM 
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("MMMM DD, YYYY h:mm:ss a");
        break;
      case "DateTime-Gregorian-3":
        // 2001, January 01 1:00:00 AM 
        sReturnDate = moment(dateTimeVal, "YYYYMMDD[T]HHmmss[.]SSS Z").format("YYYY, MMMM DD h:mm:ss a");
        break;
      case "DateTime-Custom":
        break;
    }

    return sReturnDate;
  }

}
