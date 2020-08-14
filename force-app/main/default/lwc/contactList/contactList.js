import { LightningElement, api } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {

    @api columns;
    recordId;
    contacts;
    error;
    searchName = '';
    changedSearchName = '';
    openCreateModal = false;
    openDeleteModal = false;

    connectedCallback() {
        this.loadContacts();
    }

    loadContacts() {
        getContacts({searchName: this.searchName})
            .then(result => {
                let resultData = [];
                for (let i=0; i<result.length; i++) {
                    let row = {};
                    Object.assign(row, result[i]);
                    if (row.hasOwnProperty('Account')) {
                        Object.assign(row, {AccountNameLabel: row.Account.Name});
                        Object.assign(row, {AccountNameUrl:'/lightning/r/Account/' +row.AccountId + '/view'});
                    }
                    resultData.push(row);
                }
                this.contacts = resultData;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            }
        );
    }

    handleChangeSearchName(event) {
		this.changedSearchName = event.detail.value;
    }

    handleClickFilterButton(event) { 
        this.searchName = this.changedSearchName;
        this.loadContacts();
    }
    
    handleClickNewButton(event) { 
        this.openCreateModal = true;
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
        this.loadContacts();
    }

    handleCancelCreateContact() {
        this.openCreateModal = false
    }

    handleSaveContact() {
        this.openCreateModal = false
        this.loadContacts();
    }
    
}
