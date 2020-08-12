import { LightningElement, api } from 'lwc';

export default class DeleteConfirmationModal extends LightningElement {

    @api openconfirmation;

    handleCloseConfirmation(){

        console.log("DeleteConfirmationModal handleCloseConfirmation");
        this.dispatchEvent(new CustomEvent("closeconfirmation"));
    }

    handleDelete(){

        console.log("DeleteConfirmationModal handleDelete");
        this.dispatchEvent(new CustomEvent("delete"));
    }

}