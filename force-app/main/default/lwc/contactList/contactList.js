import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {

    @api columns;

    @wire(getContacts)
    contacts;
    
}