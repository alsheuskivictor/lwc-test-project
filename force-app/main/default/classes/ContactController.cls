
public with sharing class ContactController {
    
    @AuraEnabled
    public static List<Contact> getContacts(String searchName) {

        List<Contact> contacts;
        if (String.isEmpty(searchName)) {
			contacts = [
				SELECT Id, FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate
				FROM Contact
				ORDER BY LastName ASC
			];
		} else {
			String filterVariable = '%' + searchName + '%';
			contacts = [
				SELECT Id, FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate
				FROM Contact
				WHERE Name LIKE :filterVariable
				ORDER BY LastName ASC
			];
        }
        
        return contacts;
	}

}
