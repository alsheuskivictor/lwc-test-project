import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const COLUMNS = [
    { 
        label: 'idName', 
        fieldName: 'IdName', 
        type: 'text',
    },
    {
        label:'Name',
        fieldName:'NameUrl',
        type:'url',
        typeAttributes: { label:{ fieldName:'NameLabel'} },
        
    },
];

export default class IdContactList extends LightningElement {

    columns = COLUMNS;
    contacts;
    error;

    @wire (getContacts)
    contactList (result) {
        if(result.data) {
            this.contacts = [];
            for (let i=0; i<result.data.length; i++) {
                let row = {};
                Object.assign(row, result.data[i]);
                Object.assign(row, {NameLabel: row.Name});
                Object.assign(row, {NameUrl:'/lightning/r/Contact/' +row.Id + '/view'});
                Object.assign(row, {IdName: result.data[i].Id + 'Name'});
                this.contacts.push(row);
            }
            this.error = undefined;
        }
        else if (result.error) {
            this.error = result.error;
            this.contacts = undefined;
        }
    }

}
