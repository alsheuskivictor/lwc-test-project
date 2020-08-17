import { LightningElement, wire, track } from 'lwc';
import getLeads from '@salesforce/apex/LeadController.getLeads';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';

const COLUMNS = [
    { 
        label: 'Name', 
        fieldName: NAME_FIELD.fieldApiName, 
        type: 'text',
    },
    { 
        label: 'Title', 
        fieldName: TITLE_FIELD.fieldApiName, 
        type: 'text',
    },
    { 
        label: 'Phone', 
        fieldName: PHONE_FIELD.fieldApiName, 
        type: 'phone'
    } 
];

export default class LeadList extends LightningElement {

    columns = COLUMNS;

    @wire(getLeads) leads;
    
}