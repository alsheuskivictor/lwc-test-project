import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import updateAccount from '@salesforce/apex/AccountController.updateAccount';

export default class AccountList extends LightningElement {

    accounts;
    accountsResult;
    currentAccountId;
    currentEditId;
    currentValue;
    recordId;
    openDeleteModal = false;

    @wire(getAccounts, {})
    wiredAccounts(result) {
        console.log('wiredAccounts');
        this.accountsResult = result;
        if (result.data) {
            this.accounts = deepCopy(result.data);
            for (let i = 0; i < this.accounts.length; i++) {
                this.accounts[i].idName = this.accounts[i].Id + 'Name';
                this.accounts[i].idRating = this.accounts[i].Id + 'Rating';
            }
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.accounts = undefined;
        } 
    }

    handleEditName(event) {
        console.log('handleEdit(event)');
        this.blockEditButtons();
        const inputId = event.target.dataset.inputid;
        console.log('const inputId' + inputId);
        
        const accountIdName = this.template.querySelector('span[data-accountidname="' + inputId + '"]');
        accountIdName.classList.toggle("slds-hidden");

        const inputIdName = this.template.querySelector('lightning-input[data-editid="' + inputId + '"]');
        inputIdName.classList.toggle("slds-hidden");
        inputIdName.focus();
        this.currentValue = event.target.dataset.accountname;
    }

    handleHideEdit(event) {
        console.log('handleHideEdit(event)');
        const editId = event.target.dataset.editid;
        let editField = this.template.querySelector('lightning-input[data-editid="' + editId + '"]');
        editField.classList.toggle("slds-hidden");

        const accountIdName = this.template.querySelector('span[data-accountidname="' + editId + '"]');
        accountIdName.classList.toggle("slds-hidden");
        
        const newValue = event.target.value;
        console.log('newValue=>' + newValue);
        const accountId = event.target.dataset.accountid;
        const isEqual = (this.currentValue === newValue);
               
        if (!isEqual) {
            this.accounts = this.accounts.map(function(account) {			
                 if (account.Id === accountId) {
                     account.Name = newValue;
                 }	
                 return account; 	
            });
            this.template.querySelector('td[data-tdid="' + editId + '"]').style.backgroundColor = "#FAFFBD";
            this.template.querySelector('div[data-buttonsid="editConfirm"]').classList.toggle("slds-hidden");
            this.currentAccountId = accountId;
            this.currentEditId = editId;
            this.blockEditButtons();
        } else {
            this.unblockEditButtons();
        }
    }

    
    handleEditRating(event) {
        console.log('handleEditRating');
        this.blockEditButtons(true);
        let tableTds = this.template.querySelectorAll('td[data-tds="tabletds"]');
        this.template.querySelector('div[data-buttonsid="editConfirm"]').classList.add("slds-hidden");
        const accountId = event.target.dataset.accountid;
        this.template.querySelector('tr[data-trid="' + accountId + '"] c-rating-list').clickedEditPickListIcon();
    }

    blockEditButtons() {
        console.log('blockEditButtons');
        let editButtons = this.template.querySelectorAll('button[data-editbuttonid]');
        editButtons.forEach(function (button) {
            button.disabled = true;
        });
    }

    
    unblockEditButtons() {
        console.log('unblockEditButtons');
        let editButtons = this.template.querySelectorAll('button[data-editbuttonid]');
        editButtons.forEach(function (button) {
            button.disabled = false;
        });
    }

    handleDelete(event) {
        console.log('handleDelete(event)');
        this.recordId = event.target.dataset.accountid;
        this.openDeleteModal = true;
    }


    handleCancelDelete() {
        this.openDeleteModal = false;
    }

    handleConfirmDelete() {
        this.openDeleteModal = false;
        this.template.querySelector('div[data-buttonsid="editConfirm"]').classList.toggle("slds-hidden");
        this.unblockEditButtons();
        return refreshApex(this.accountsResult);
    }

    reRenderAccounts(event) {
        const accountFromChild = event.detail;
        this.accounts = this.accounts.map(function (account) {
            if (account.Id === accountFromChild.Id) {
                account.Rating = accountFromChild.Rating;
            }
            return account;
        });
        this.template.querySelector('td[data-tdid="'+accountFromChild.idRating+'"]').style.backgroundColor="#FAFFBD";
        this.template.querySelector('div[data-buttonsid="editConfirm"]').classList.toggle("slds-hidden");
        this.currentEditId = accountFromChild.idRating;
        this.currentAccountId = accountFromChild.Id;
    }

    handleCancelChanges() {
        eval("$A.get('e.force:refreshView').fire();");
        this.unblockEditButtons();
    }

    handleSaveChanges(event) {
        console.log('handleSaveChanges(event)');
        let accountToUpdate;
        const currentAccount = this.currentAccountId;
        let updatedAccounts = this.accounts;
        for (let i = 0; i < updatedAccounts.length; i++) {
            if (updatedAccounts[i].Id === currentAccount) {
                accountToUpdate = updatedAccounts[i];
                break;
            }
        }
        console.log("to update: " + JSON.stringify(accountToUpdate));

        updateAccount({ updatedAccount: accountToUpdate })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record Is Updated',
                        variant: 'success',
                    }),
                );
                this.template.querySelector('td[data-tdid="'+this.currentEditId+'"]').style.backgroundColor="white";
                this.template.querySelector('div[data-buttonsid="editConfirm"]').classList.toggle("slds-hidden");
                refreshApex(this.accountsResult);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error on data save.',
                        message: 'Error on account update.',
                        variant: 'error',
                    }),
                );
            });
        this.unblockEditButtons();
    }
}

function deepCopy(obj) {
    if (Object(obj) !== obj) {
        return obj;
    }
    if (obj instanceof Set) {
        return new Set(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (typeof obj === 'function') {
        return obj.bind({});
    }
    if (Array.isArray(obj)) {
        const obj2 = [];
        const len = obj.length;
        for (let i = 0; i < len; i++) {
            obj2.push(deepCopy(obj[i]));
        }
        return obj2;
    }
    const result = Object.create({});
    let keys = Object.keys(obj);
    if (obj instanceof Error) {
        keys = Object.getOwnPropertyNames(obj);
    }
    const len = keys.length;
    for (let i = 0; i < len; i++) {
        const key = keys[i];
        result[key] = deepCopy(obj[key]);
    }
    return result;
}
