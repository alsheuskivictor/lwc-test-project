public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String searchName) {

        List<Contact> contacts;
        if (String.isEmpty(searchName)) {
			contacts = [
				SELECT Id, FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate
				FROM Contact
				ORDER BY LastName ASC
			];
		} else {
			String filterVar = '%' + searchName + '%';
			contacts = [
				SELECT Id, FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate
				FROM Contact
				WHERE Name LIKE :filterVar
				ORDER BY LastName ASC
			];
        }
        
        return contacts;
    }

}