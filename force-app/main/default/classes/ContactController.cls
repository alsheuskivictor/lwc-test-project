public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(/*List<String> fields*/) {

        return [
             SELECT Id, FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate 
             FROM Contact 
             ORDER BY LastName ASC
        ];
    }

}