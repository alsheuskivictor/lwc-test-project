import { LightningElement, wire, track } from 'lwc';
import getLeads from '@salesforce/apex/LeadController.getLeads';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';

const COLUMNS = [
    // { 
    //     label: 'Name', 
    //     fieldName: NAME_FIELD.fieldApiName, 
    //     type: 'text',
    // },
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
    },
    { 
        label: 'Phone', 
        fieldName: PHONE_FIELD.fieldApiName, 
        type: 'phone'
    } 
];

export default class LeadList extends LightningElement {

    columns = COLUMNS;
    leads;
    error;

    @wire (getLeads)
    wiredLeads ({data, error}) {
        console.log({data});
        console.log({error});
        if(data) {
            let resultData = [];
            for (let i=0; i<data.length; i++) {
                let row = {};
                Object.assign(row, data[i]);
                Object.assign(row, {NameLabel: row.Name});
                Object.assign(row, {NameUrl:'/lightning/r/Lead/' +row.Id + '/view'});
                resultData.push(row);
            }
            this.leads = resultData;
            this.error = undefined;

        }
        else if (error) {
            this.error = error;
            this.leads = undefined;
        }
    }

}
