import { LightningElement, wire, track } from 'lwc';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import MOBILE_PHONE_FIELD from '@salesforce/schema/Contact.MobilePhone';
import CREATED_DATE_FIELD from '@salesforce/schema/Contact.CreatedDate';

const COLUMNS = [
    { 
        label: 'First Name', 
        fieldName: FIRST_NAME_FIELD.fieldApiName, 
        type: 'text',
    },
    { 
        label: 'Last Name', 
        fieldName: LAST_NAME_FIELD.fieldApiName, 
        type: 'text',
    },
    { 
        label: 'Email', 
        fieldName: EMAIL_FIELD.fieldApiName, 
        type: 'email' 
    },
    {
        label:'Account Name',
        fieldName:'AccountNameUrl',
        type:'url',
        typeAttributes: { label:{ fieldName:'AccountNameLabel' } },
    },
    { 
        label: 'Mobile Phone', 
        fieldName: MOBILE_PHONE_FIELD.fieldApiName, 
        type: 'phone'
    },
    { 
        label: 'Created Date', 
        fieldName: CREATED_DATE_FIELD.fieldApiName, 
        type: 'date',
        typeAttributes: { month:"2-digit", day:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit"},
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
          class: "btn_next"
        }
      }    
];

export default class ContactListForm extends LightningElement {

    columns = COLUMNS;
    searchName = '';

    changedSearchName = '';

    handleChangeSearchName(event) {
		this.changedSearchName = event.detail.value;
    }

    handleClickFilterButton(event) { 
        this.searchName = this.changedSearchName;
	}
    
}