import { LightningElement, wire, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getLeads from '@salesforce/apex/LeadController.getLeads';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';

const COLUMNS = [
    {
        label:'Name',
        fieldName:'NameUrl',
        type:'url',
        typeAttributes: { label:{ fieldName:'NameLabel' } },
    },
    { 
        label: 'Title', 
        fieldName: TITLE_FIELD.fieldApiName, 
        type: 'text',
        editable : 'true',
    },
    { 
        label: 'Phone', 
        fieldName: PHONE_FIELD.fieldApiName, 
        type: 'phone',
        editable : 'true',
    },
];

export default class LeadList extends LightningElement {

    @track columns = COLUMNS;
    @track leads;
    @track error;
    @track draftValues = [];
    @track wiredResult;

    @wire (getLeads)
    wiredLeads (result) {
        this.wiredResult = result;
        if(result.data) {
            this.leads = [];
            for (let i=0; i<result.data.length; i++) {
                let row = {};
                Object.assign(row, result.data[i]);
                Object.assign(row, {NameLabel: row.Name});
                Object.assign(row, {NameUrl:'/lightning/r/Lead/' +row.Id + '/view'});
                this.leads.push(row);
            }
            this.error = undefined;
        }
        else if (result.error) {
            this.error = error;
            this.leads = undefined;
        }
    }

    handleSave(event) {

        const inputRecords =  event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });

        const promises = inputRecords.map(inputRecord => updateRecord(inputRecord));

        Promise.all(promises)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'All Leads updated',
                    variant: 'success'
                })
            );
            this.draftValues = [];
            return refreshApex(this.wiredResult);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

}
