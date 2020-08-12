import { LightningElement, api, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import deleteContacts from '@salesforce/apex/ContactController.deleteContacts';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ContactList extends LightningElement {

    @api searchName = '';
    @api columns;
    contacts = [];
    error;
    openconfirmation = false;
    deleteContactId = 0;

    @wire(getContacts, {searchName: '$searchName'}) 
    wiredContacts({data, error}) {
       
        if (data) {
            let resultData = [];
            for (let i=0; i<data.length; i++) {
                let row = {};
                Object.assign(row, data[i]);
                if (row.hasOwnProperty('Account')) {
                    Object.assign(row, {AccountNameLabel: row.Account.Name});
                    Object.assign(row, {AccountNameUrl:'/lightning/r/Account/' +row.AccountId + '/view'});
                }
                resultData.push(row);
            }
            this.contacts = resultData;
            this.error = undefined;
        } else if (error) {
            this.contacts = [];
            this.error = error;
        }
    }

    handleRowAction(cmp, event, helper) {

        const action = cmp.detail.action.name;
        const contactId = cmp.detail.row.Id;
        switch (action) {
          case "delete":
            // console.log("cmp.detail: " + JSON.stringify(cmp.detail));
            console.log("handleRowAction delete contactId: " + contactId);
            
            this.deleteContactId = contactId;
            this.showConfirmation();
            break;
          default:
            console.log("no action");
        }
    }

    showConfirmation() {

        this.openconfirmation = true;
    }
    
    closeConfirmation() {

        console.log("ContactList closeConfirmation");
        this.openconfirmation = false;
    }

    handleCloseConfirmation() {
        
        console.log("ContactList handleCloseConfirmation");
        this.closeConfirmation();
    }

    handleDelete() {
        try {
            console.log("ContactList handleDelete");
            let deleteContactIds = this.deleteContactId;
            deleteContacts({deleteContactIds});
            this.handleResponse("success", "Delete Contact");
        } catch (error) {
          console.error(error);
          this.handleResponse("fail", "Delete Contact");
        }
        this.closeConfirmation();
    }

    handleResponse(type, message) {
        let toastEvent = null;
        switch (type) {
          case "success":
            toastEvent = new ShowToastEvent({
              title: "Success operation.",
              message: "Operation '"+message+"' executed successfully.",
              variant: "success"
            });
            break;
          case "fail":
            toastEvent = new ShowToastEvent({
              title: "Failed operation",
              message: "Failed executed operation: '"+message+"'.",
              variant: "error"
            });
            break;
          default:
            toastEvent = new ShowToastEvent({
              title: "Unexpected operation.",
              message: "Contact the administrator for more information."
            });
        }
        this.dispatchEvent(toastEvent);
      }
    
}