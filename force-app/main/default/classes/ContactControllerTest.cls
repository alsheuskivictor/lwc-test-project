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
        List<Contact> returnedContacts = ContactController.getContacts('');
        Test.stopTest();

        System.assertEquals(numberOfContacts, returnedContacts.size(), 'Should be returned ' + numberOfContacts + 
            ' Contacts');
    
    }

    @isTest static void testFilterContactsByFirstName() {

        List<Contact> contactsToInsert = new List<Contact>();
        Contact contact1 = new Contact(FirstName='abc', LastName='qwerty');
        Contact contact2 = new Contact(FirstName='bcd', LastName='qwerty');
        Contact contact3 = new Contact(FirstName='cde', LastName='qwerty');
        contactsToInsert.add(contact1);
        contactsToInsert.add(contact2);
        contactsToInsert.add(contact3);
        insert contactsToInsert;

        Test.startTest();
        List<Contact> filtredContacts = ContactController.getContacts('bc');
        Test.stopTest();

        System.assertEquals(2, filtredContacts.size(), 'Should be returned 2 Contacts with matched substring' + 
            'in First Name');
            
    }

    @isTest static void testFilterContactsByLastName() {

        List<Contact> contactsToInsert = new List<Contact>();
        Contact contact1 = new Contact(FirstName='abc', LastName='qwer');
        Contact contact2 = new Contact(FirstName='bcd', LastName='qwert');
        Contact contact3 = new Contact(FirstName='cde', LastName='qwerty');
        contactsToInsert.add(contact1);
        contactsToInsert.add(contact2);
        contactsToInsert.add(contact3);
        insert contactsToInsert;

        Test.startTest();
        List<Contact> filtredContacts = ContactController.getContacts('erty');
        Test.stopTest();

        System.assertEquals(1, filtredContacts.size(), 'Should be returned 1 Contacts with matched substring ' +
            'in Last Name');

    }

}