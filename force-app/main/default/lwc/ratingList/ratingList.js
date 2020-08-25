import { LightningElement, api, wire } from 'lwc';
import getRatingPickListValues from '@salesforce/apex/AccountController.getRatingPickListValues';

export default class RatingList extends LightningElement {
    @api account;
    options = [];
    previousValue;
    items = [];
    value = '';

    @api
    clickedEditPickListIcon() {
        let topDiv = this.template.querySelector('div[data-topdiv="' + this.account.Id + '"]');
        topDiv.classList.toggle("slds-hidden");
        let select = this.template.querySelector('select');
        select.focus();
        select.value = this.account.Rating;
        this.previousValue = this.account.Rating;
    }

    hidePickListField() {
        let topDiv = this.template.querySelector('div[data-topdiv="' + this.account.Id + '"]');
        topDiv.classList.toggle("slds-hidden");
        let select = this.template.querySelector('select');
        const isEqual = (this.previousValue === select.value);

        if (isEqual) {
            this.dispatchEvent(new CustomEvent('enableeditbuttons'));
        } else {
            this.account.Rating = select.value;
            this.account.previousValue = this.previousValue;
            this.dispatchEvent(new CustomEvent('rerenderaccounts', {
                detail: this.account
            }));
        }
    }

    @wire(getRatingPickListValues)
    getPickList({ error, data }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                this.options = [...this.options, { value: data[i].value, label: data[i].label }];
            }
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}