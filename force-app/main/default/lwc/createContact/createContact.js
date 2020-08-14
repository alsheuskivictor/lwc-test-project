import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import CONTACT_ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
import MOBILE_PHONE_FIELD from '@salesforce/schema/Contact.MobilePhone';

export default class CreateContact extends LightningElement {

    contactObj = CONTACT_OBJECT;
    nameField = CONTACT_NAME_FIELD;
    emailField = CONTACT_EMAIL_FIELD;
    accountIdField = CONTACT_ACCOUNTID_FIELD;
    mobilePhoneField = MOBILE_PHONE_FIELD;

    handleCancel() {
        this.dispatchEvent(new CustomEvent("cancel"));
    }

    handleSave() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Contact created',
                variant: 'success'
            })
        );
        this.dispatchEvent(new CustomEvent('save'));
    }

}
