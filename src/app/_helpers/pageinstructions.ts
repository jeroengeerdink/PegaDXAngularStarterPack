export class PageInstructions {

    oPageInstructions: Object;

    constructor() {
        this.oPageInstructions = JSON.parse('{"pageInstructions": []}');

    }


    clearPageInstructions() {
        this.oPageInstructions = JSON.parse('{"pageInstructions": []}');

    }

    getPageInstructions() : object {
        return this.oPageInstructions;
    }

    addAListInstruction(instruction: string, target: string, listIndex: number, content: object) {
        let oInstruction = new Object();
        instruction = instruction.toUpperCase();

        oInstruction["instruction"] = instruction;
        if (target.indexOf(".") != 0) {
            target = "." + target;
        }
        oInstruction["target"] = target;
        if (instruction != "APPEND") {
            if (listIndex != null && listIndex > 0) {
                oInstruction["listIndex"] = listIndex;
            }
        }
        oInstruction["content"] = content;

        let arPI : Array<object> = this.oPageInstructions["pageInstructions"];

        arPI.push(oInstruction);

        this.oPageInstructions["pageInstructions"] = arPI;

    }

    // generic, any last instruction
    getLastInstruction(): Object {
        let oReturn = null;
        let arPI : Array<object> = this.oPageInstructions["pageInstructions"];
        if (arPI.length > 0) {
            oReturn = arPI[arPI.length -1];
        }

        return oReturn;
    }

    isLastListInstruction(instruction: string, target: string, listIndex: number) : boolean {
        let bReturn: boolean = false;

        if (target.indexOf(".") != 0) {
            target = "." + target;
        }

        let oLastInst = this.getLastInstruction();
        if (oLastInst != null) {
            if ((oLastInst["instruction"] === instruction) && 
                (oLastInst["target"] === target) &&
                (oLastInst["listIndex"] == listIndex)) {
                    bReturn = true;
            }
        }
    
        return bReturn;

    }

    getLastInstructionContent() : object {
        let oReturn = null;
        let oLast = this.getLastInstruction();
        if (oLast != null) {
            oReturn = oLast["content"];
        }

        return oReturn;
    }

    updateLastInstructionContent(content: object) {
        let oLast = this.getLastInstruction();
        oLast["content"] = content;
    }




    addAGroupInstruction(instruction: string, target: string, groupIndex: string, content: object) {
        let oInstruction = new Object();
        instruction = instruction.toUpperCase();

        oInstruction["instruction"] = instruction;
        if (target.indexOf(".") != 0) {
            target = "." + target;
        }
        oInstruction["target"] = target;

        if (instruction != "APPEND") {
            if (groupIndex != null && groupIndex != "") {
                oInstruction["groupIndex"] = groupIndex;
            }
        }
        oInstruction["content"] = content;

        let arPI : Array<object> = this.oPageInstructions["pageInstructions"];

        arPI.push(oInstruction);

        this.oPageInstructions["pageInstructions"] = arPI;
    }

    isLastGroupInstruction(instruction: string, target: string, groupIndex: string) : boolean {
        let bReturn: boolean = false;

        if (target.indexOf(".") != 0) {
            target = "." + target;
        }

        let oLastInst = this.getLastInstruction();
        if (oLastInst != null) {
            if ((oLastInst["instruction"] === instruction) && 
                (oLastInst["target"] === target) &&
                (oLastInst["groupIndex"] == groupIndex)) {
                    bReturn = true;
            }
        }
    
        return bReturn;

    }








    addAnUpdatePageInstruction(target: string, refName: string, value: any) {
        let oInstruction = this.getEmbeddedPageInstruction(target);
        if (oInstruction != null) {
            let oContent = oInstruction["content"];
            oContent[refName] = value;
        }
        else {
            let oInstruction = new Object();
            oInstruction["instruction"] = "UPDATE";
            oInstruction["target"] = target;

            let oContent = new Object();
            oContent[refName] = value;

            oInstruction["content"] = oContent;
 
            let arPI : Array<object> = this.oPageInstructions["pageInstructions"];

            arPI.push(oInstruction);

            this.oPageInstructions["pageInstructions"] = arPI;
        }

    }

    getEmbeddedPageInstruction(target: string) {
        let oReturn = null;
        let arPI : Array<object> = this.oPageInstructions["pageInstructions"];
        for (let index in arPI) {

            if (arPI[index]["target"] === target) {
                return arPI[index];
            }
        }

        return oReturn;       
    }

}
