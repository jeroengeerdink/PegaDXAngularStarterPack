import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RefreshAssignmentService } from '../../_messages/refreshassignment.service';
import { GetActionsService } from '../../_messages/getactions.service';
import { Subscription, Observable, of } from 'rxjs';
import { GetChangesService } from '../../_messages/getchanges.service';
import { PageInstructionsService } from '../../_messages/pageinstructions.service';


@Component({
  selector: 'app-repeatinggrid',
  templateUrl: './repeatinggrid.component.html',
  styleUrls: ['./repeatinggrid.component.scss']
})
export class RepeatinggridComponent implements OnInit {

  @Input() layoutComp: any;
  @Input() formGroup: FormGroup;
  @Input() CaseID: string;

  repeatHeader$: any;
  repeatRows$: any;
 

  actionMessage: any;
  actionSubscription: Subscription;

  constructor(private raservice: RefreshAssignmentService,
              private gactionsservice: GetActionsService,
              private gcservice: GetChangesService,
              private piservice: PageInstructionsService) { 

    this.actionSubscription = this.gactionsservice.getMessage().subscribe(message => { 
      this.actionMessage = message;

      this.handleFormActions(this.actionMessage.actionName, this.actionMessage.action, this.actionMessage.caseID, this.actionMessage.reference);
    });

  }

  ngOnInit() {
    this.repeatHeader$ = this.layoutComp.header.groups;
    this.repeatRows$ = this.layoutComp.rows;
  }

  ngOnDestroy() {
    this.actionSubscription.unsubscribe();
  }

  handleFormActions(sAction: string, oAction: any, caseID: string, reference: string) {

    if (caseID === this.CaseID) {

      switch(sAction){
        case "addRow":
          this.addRowAction(oAction, reference);
          break;
        case "deleteRow" :
          this.deleteRowAction(oAction, reference);
          break;
      }
    }
  }

  getRepeatRef(sRef: string) : string {
    let arProps = sRef.split(".");
    for (let i = arProps.length -1; i > 0; i--) {
      let sProp = arProps[i];
      if (sProp.indexOf("(") >= 0) {
        break;
      }
      else {
        arProps.pop();
      }
    }

    sRef = arProps.join(".");

    // now get rid of last ()
    sRef = sRef.substring(0, sRef.lastIndexOf("("));

    return sRef;
  }

  addRowAction(oAction: any, rowRef: string, groupRowRef: string = "", bAppend: boolean = false) {

    let sCompareRef = this.getRepeatRef(rowRef);


    let sRowEditing = "row";
    if (this.layoutComp.repeatRowOperations && this.layoutComp.repeatRowOperations.rowEditing) {
      sRowEditing = this.layoutComp.repeatRowOperations.rowEditing
    }
 
    if (sRowEditing == "readOnly") {
      return;
    }
    
    let sRef = this.layoutComp.reference;
    
    if (sCompareRef != sRef) {
      return;
    }

    let sRefType = this.layoutComp.referenceType;
    let sRowIndex = rowRef.substring(rowRef.lastIndexOf("(")+ 1, rowRef.lastIndexOf(")"));
    let bUseNewRow = localStorage.getItem("useNewRow") == "true" ? true : false;
    let bUseRepeatPageInstructions = localStorage.getItem("useRepeatPageInstructions") == "true" ? true : false;

    if (!bUseNewRow) {
      return;
    }

    if (sRefType == "List") {

      // pageList

      if (sRowIndex === "<APPEND>") {
        sRowIndex = this.layoutComp.rows.length.toString();
      }
      let rowIndex = parseInt(sRowIndex);
      let rowRefName = rowRef.substring(0, rowRef.lastIndexOf("("));
      let sRowRef = rowRef.substring(0, rowRef.lastIndexOf(")") + 1);

      if (rowRefName == sRef) {
        let addRowNum = rowIndex; // already 1 greater, since 1 based, but array is 0 based
        // copy
        let addRowJSON = JSON.stringify(this.layoutComp.newRow);
        let addRow = JSON.parse(addRowJSON);
        let sIndexPrefix = sRef;
        if (sIndexPrefix.indexOf(".")>= 0) {
          sIndexPrefix = sIndexPrefix.substring(sIndexPrefix.lastIndexOf(".")+1);
        }


        // template newRow is (listIndex) for pageList
        let sRefToken = addRow.listIndex;

        if (bAppend) {
          rowIndex++;
        }
        
        let sNewRef = rowRefName.concat("(").concat(rowIndex.toString()).concat(")");
        addRowJSON = this.replaceReferenceJSON(addRowJSON, sRefToken, rowIndex.toString());
        addRow = JSON.parse(addRowJSON);

        // remove listIndex
        delete addRow.listIndex;

        this.layoutComp.rows.splice(rowIndex -1, 0, addRow);

        this.updateRowsWithNewReferenceFrom(this.layoutComp.rows, rowIndex, rowRefName, true);
       
        if (bUseRepeatPageInstructions) {
          if (bAppend) {
            this.piservice.sendMessage(this.CaseID, sRefType, "APPEND", sRef, rowIndex.toString(), {});
          }
          else {
            this.piservice.sendMessage(this.CaseID, sRefType, "INSERT", sRef, rowIndex.toString(), {});
          }
        }

        this.gcservice.sendMessage( "ALL", null, this.CaseID, sRefType);
        
      }
    }
    else {

      // pageGroup

      // sRowIndex will be a string
      let rowRefName = rowRef.substring(0, rowRef.lastIndexOf("("));

      if (groupRowRef === "") {
        groupRowRef = prompt("Row name to add", "");
      }

      if (rowRefName == sRef) {

        // template newRow is (groupIndex) for pageGroup
        let addRow = JSON.parse(JSON.stringify(this.layoutComp.newRow));
        let sOldRef = rowRefName.concat("(" + addRow.groupIndex + ")");
        let sNewRef = sOldRef.replace(addRow.groupIndex, groupRowRef);

        this.replaceReference(addRow, "groups", sOldRef, sNewRef, groupRowRef);

        addRow.groupIndex = groupRowRef;

        this.layoutComp.rows.splice(this.layoutComp.rows.length, 0, addRow);

        if (bUseRepeatPageInstructions) {
          this.piservice.sendMessage(this.CaseID, sRefType, "ADD", sRef, groupRowRef, {});
        }

        this.gcservice.sendMessage( "ALL", null, this.CaseID, sRefType);
      }

    }


  }

  escapeRegExp(str: string): string {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  replaceReferenceJSON(sElement: string, sRef: string, sIndex: string) : string {
    return sElement.replace( new RegExp(this.escapeRegExp(sRef), 'g'), sIndex);
  }

  deleteRowAction(oAction: any, rowRef: string, groupRowRef: string ="") {
    let sRowEditing = "row";
    if (this.layoutComp.repeatRowOperations && this.layoutComp.repeatRowOperations.rowEditing) {
      sRowEditing = this.layoutComp.repeatRowOperations.rowEditing
    }
 
    if (sRowEditing == "readOnly") {
      return;
    }

    let sCompareRef = this.getRepeatRef(rowRef);

    let sRef = this.layoutComp.reference;
    if (sCompareRef != sRef) {
      return;
    }


    let sRefType = this.layoutComp.referenceType;
    let sRowIndex = rowRef.substring(rowRef.lastIndexOf("(")+ 1, rowRef.lastIndexOf(")"));
    let bUseNewRow = localStorage.getItem("useNewRow") == "true" ? true : false;
    let bUseRepeatPageInstructions = localStorage.getItem("useRepeatPageInstructions") == "true" ? true : false;

    if (!bUseNewRow) {
      return;
    }

    if (sRefType == "List") {
      if (sRowIndex === "<LAST>") {
        sRowIndex = this.layoutComp.rows.length.toString();
      }
      let rowIndex = parseInt(sRowIndex);

      
      let rowRefName = rowRef.substring(0, rowRef.lastIndexOf("("));


      if (rowRefName == sRef) {
        // ref is 1 based, but array is 0 based
        let deleteRowNum = rowIndex - 1;
        if (this.layoutComp.rows.length > deleteRowNum) {
          this.layoutComp.rows.splice(deleteRowNum, 1);
        }

        this.updateRowsWithNewReferenceFrom(this.layoutComp.rows, deleteRowNum, rowRefName, false);

        if (bUseRepeatPageInstructions) {
          this.piservice.sendMessage(this.CaseID, sRefType, "DELETE", sRef, rowIndex.toString(), {});
        }

        this.gcservice.sendMessage( "ALL", null, this.CaseID, sRefType);
        
      }
    }
    else {
      // group
      let rowRefName = rowRef.substring(0, rowRef.lastIndexOf("("));

      if (rowRefName == sRef) {
        // going to have to iterate through list of rows, see if have it, get index
        let deleteRowIndex = this.findIndexOfRow(this.layoutComp.rows, rowRef);
        if (deleteRowIndex >= 0) {
          this.layoutComp.rows.splice(deleteRowIndex, 1);
        }

        if (bUseRepeatPageInstructions) {
          this.piservice.sendMessage(this.CaseID, sRefType, "DELETE", sRef, groupRowRef, {});
        }

        this.gcservice.sendMessage( "ALL", null, this.CaseID, sRefType);

      }
    }

  }

  findIndexOfRow(oRows: any, sRowRef: string): number {
    let rowIndex = -1;
    for (let index in oRows) {
      let oRow = oRows[index];
      let sRowJson = JSON.stringify(oRow);

      if (sRowJson.indexOf(sRowRef) >= 0) {
        rowIndex = parseInt(index);
        break;
      }

    }

    return rowIndex;
  }

  updateRowsWithNewReferenceFrom(oRows: any, nStartingIndex: number, sReferencePrefix: string,  bIncrement: boolean = true): any {
    let nRowLength = oRows.length;
    for ( let nIndex = nStartingIndex; nIndex < nRowLength; nIndex++ ) {
      let oRow = oRows[nIndex];

      let sNewRef = "";
      let sRef;
      let sNewIndex;
      let sOldIndex;
      if (bIncrement) {
        sNewRef = sReferencePrefix.concat("(").concat((nIndex + 1).toString()).concat(")");
        sRef = sReferencePrefix.concat("(").concat(nIndex.toString()).concat(")");
        sNewIndex = (nIndex + 1).toString();
        sOldIndex = nIndex.toString();
      }
      else {
        // should be a number higher, and so if we set to index, should be one less
        sNewRef = sReferencePrefix.concat("(").concat((nIndex + 1).toString()).concat(")");
        sRef = sReferencePrefix.concat("(").concat((nIndex + 2).toString()).concat(")");
        sNewIndex = (nIndex + 1).toString();
        sOldIndex = (nIndex + 2).toString();
      }

      // iterate though all the stuff in the row and change the reference
      this.replaceReference(oRow, "groups", sRef, sNewRef, sNewIndex, sOldIndex);



    }

  }

  replaceReference(oElement: any, oElementType: string, sOldReference: string, 
                    sNewReference: string, sNewIndex: string, sOldIndex: string = "") {

    switch (oElementType) {
      case "groups" :
        for (let groupIndex in oElement.groups) {
          let groupElement = oElement.groups[groupIndex];
          for (let elType in groupElement) {
            this.replaceReference(groupElement, elType, sOldReference, sNewReference, sNewIndex, sOldIndex);
          }
        }
        break;
      case "field" :
        oElement.field.reference = oElement.field.reference.replace(sOldReference, sNewReference, sNewIndex);
        if (oElement.field.controlName) {
          //oElement.field.controlName = oElement.field.controlName.replace(sOldReference, sNewReference, sNewIndex);
        }
        if (oElement.field.fieldID == "pxSubscript") {
          oElement.field.value = sNewIndex;
        }

        this.updateRefreshFor(oElement.field.control, sNewIndex, sOldIndex);

        break;
      case "layout" :
        if (oElement.layout.reference) {
          oElement.layout.reference = oElement.layout.reference.replace(sOldReference, sNewReference, sNewIndex);
        }
        for (let groupIndex in oElement.layout.groups) {
          let groupElement = oElement.layout.groups[groupIndex];
          for (let elType in groupElement) {
            this.replaceReference(groupElement, elType, sOldReference, sNewReference, sNewIndex, sOldIndex);
          }
        }
        break;
      case "view" :
        oElement.view.reference = oElement.view.reference.replace(sOldReference, sNewReference, sNewIndex);
        for (let groupIndex in oElement.view.groups) {
          let groupElement = oElement.view.groups[groupIndex];
          for (let elType in groupElement) {
            this.replaceReference(groupElement, elType, sOldReference, sNewReference, sNewIndex, sOldIndex);
          }        
        }
        break;
    }

  }

  updateRefreshFor(oControl, sNewIndex: string, sOldIndex: string) {
    if (oControl.actionSets != null) {

      for (let setIndex in oControl.actionSets) {
        let arActions = oControl.actionSets[setIndex].actions;

        for (let actionIndex in arActions) {
          let oAction = arActions[actionIndex];

          if (oAction.refreshFor != null) {
            let sRefreshFor = oAction.refreshFor;
            let sIndex = sRefreshFor.lastIndexOf("_");
            if (sIndex > 0) {
              sRefreshFor = sRefreshFor.substring(0, sIndex+1);
              sRefreshFor = sRefreshFor.concat(sNewIndex);

              oAction.refreshFor = sRefreshFor;

            }
            else {
              // old reference could be missing "_"
              if (sOldIndex != "") {
                sIndex = sRefreshFor.lastIndexOf(sOldIndex);
                if (sIndex > 0) {
                  sRefreshFor = sRefreshFor.substring(0, sIndex);
                  sRefreshFor = sRefreshFor.concat(sNewIndex);
    
                  oAction.refreshFor = sRefreshFor; 
                }
              }
            }
          }
        }
      }
    }
  }



  updateReference(sReference: string, sReferencePrefix: string, sReferenceIndex: string): string {
    let sRefEnd = sReference.replace(sReferencePrefix, ""); 
    sRefEnd = sRefEnd.substring(sRefEnd.indexOf(")"));  // keeps trailing )

    sReference = sReferencePrefix.concat("(") + sReferenceIndex + sRefEnd;


    return sReference;
  }



  addRow() {

    let sRowEditing = "row";
    if (this.layoutComp.repeatRowOperations && this.layoutComp.repeatRowOperations.rowEditing) {
      sRowEditing = this.layoutComp.repeatRowOperations.rowEditing
    }
 
    if (sRowEditing != "readOnly") {

      let bUseNewRow = localStorage.getItem("useNewRow") == "true" ? true : false;
      if (this.layoutComp.referenceType === "List") {
        // list
        // check if have "newRow", if so, use that method
        if (bUseNewRow) {
          let sRef = this.layoutComp.reference.concat("(<APPEND>)");
          this.addRowAction(null, sRef, null, true);
        }
        else {
          let addRowData = { 'rowNum': '', 'layoutData': this.layoutComp };
          this.raservice.sendMessage("addRow", addRowData);
        }



      }
      else {
        // group
        let rowName = prompt("Row name to add", "");

        // check if have "newRow", if so, use that method
        if (bUseNewRow) {
          let sRef = this.layoutComp.reference.concat("(" + rowName + ")");
          this.addRowAction(null, sRef, rowName);
        }
        else {
          let addGroupData = { 'rowName': rowName, 'layoutData': this.layoutComp};
          this.raservice.sendMessage("addRow", addGroupData);
        }

      }
   } 


  }

  removeRow() {
    let sRowEditing = "row";
    if (this.layoutComp.repeatRowOperations && this.layoutComp.repeatRowOperations.rowEditing) {
      sRowEditing = this.layoutComp.repeatRowOperations.rowEditing
    }
 
    if (sRowEditing != "readOnly") {

      let bUseNewRow = localStorage.getItem("useNewRow") == "true" ? true : false;
      if (this.layoutComp.referenceType === "List") {
        // list
  
        // check if have "newRow", if so, use that method
        if (bUseNewRow) {
          let sRef = this.layoutComp.reference.concat("(<LAST>)");
          this.deleteRowAction(null, sRef);
        }
        else {
          let removeRowData = { 'rowNum': '', 'layoutData': this.layoutComp };
          this.raservice.sendMessage("removeRow", removeRowData);
        }
  
      }
      else {
        // group
        let rowName = prompt("Row name to remove", "");
  
        // check if have "newRow", if so, use that method
        if (bUseNewRow) {
          let sRef = this.layoutComp.reference.concat("(" + rowName + ")");
          this.deleteRowAction(null, sRef, rowName);
        }
        else {
          let removeGroupData = { 'rowName': rowName, 'layoutData': this.layoutComp };
          this.raservice.sendMessage("removeRow", removeGroupData);
        }
      }
    }



  }


}
