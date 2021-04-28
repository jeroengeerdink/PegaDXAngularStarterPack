import { GetActionsService } from '../_messages/getactions.service';


export class HandleActions {

    constructor(private gactionsservice: GetActionsService) {

    }

    // given action set and action, will send out a message
    generateActions( eventName: string, actionSets: Array<any>, CaseID: string, reference: string) {
        
        for (let actionSet of actionSets) {
            // in this set of actions, do we have a matching event
            let events = actionSet.events;
            for (let eventObj of events) {
                if (eventObj.event === eventName) {
                    // have event, send messages for each action
                    let actions = actionSet.actions;
                    for (let actionObj of actions) {
                        this.gactionsservice.sendMessage(actionObj.action, actionObj, CaseID, reference);
                    }
                }
            }
            
            
        }
    }
}
