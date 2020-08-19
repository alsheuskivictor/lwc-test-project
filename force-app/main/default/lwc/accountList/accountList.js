import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const COLUMNS = [
    { 
        label: 'Name', 
        fieldName: NAME_FIELD.fieldApiName, 
        type: 'Text',
    },
    { 
        label: 'Rating', 
        fieldName: RATING_FIELD.fieldApiName, 
        type: 'Picklist',
    },
    {
        label: "Delete",
        type: "button",
        initialWidth: 120,
        typeAttributes: {
          label: { fieldName: "actionLabel" },
          title: "Click to Delete",
          name: "delete",
          iconName: "utility:delete",
          disabled: { fieldName: "actionDisabled" },
          class: "btn_next",
        }
    }    
];

export default class AccountList extends LightningElement {

    columns = COLUMNS;
    recordId;
    accounts;
    error;
    openDeleteModal = false;

    connectedCallback() {
        this.loadAccounts();
    }

    loadAccounts() {
        getAccounts()
            .then(result => {
                this.accounts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
            }
        );
    }

    handleRowAction(cmp, event, helper) {
        this.recordId = cmp.detail.row.Id;
        if (cmp.detail.action.name == "delete") {
            this.openDeleteModal = true;
        } else {
            console.log("no action");
        }
    }

    handleCancelDeleteContact() {
        this.openDeleteModal = false;
    }

    handleDeleteContact() {
        this.openDeleteModal = false;
        this.loadAccounts();
    }

}
