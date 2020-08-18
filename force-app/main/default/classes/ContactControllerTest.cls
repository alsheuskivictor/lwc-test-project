@isTest
public class ContactControllerTest {

    @isTest static void testGetContacts() {
        
        Integer numberOfContacts = 10;
        List<Contact> contactsToInsert = new List<Contact>();
        for ( Integer i=0; i<numberOfContacts; i++ ) {
            Contact contact = new Contact(LastName='Test' + i);
            contactsToInsert.add(contact);
        }
        if (!contactsToInsert.isEmpty()) {
            insert contactsToInsert;
        }
        
        Test.startTest();
        List<Contact> returnedContacts = ContactController.getContacts();
        Test.stopTest();

        System.assertEquals(numberOfContacts, returnedContacts.size(), 'Should be returned ' + numberOfContacts + 
            ' Contacts');
    }

}