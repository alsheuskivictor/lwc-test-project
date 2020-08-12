import { LightningElement, api, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {

    @api searchName = '';
    @api columns;
    @track contacts = [];
    @track error;
        
    @wire(getContacts, {searchName: '$searchName'}) 
    wiredContacts({data, error}) {
        if(data) {
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

}
