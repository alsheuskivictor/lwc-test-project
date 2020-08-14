@isTest
private  with sharing class DeleteContactCasesTest {

    @isTest static void testDeleteContactWithOneCase() {

        Contact contact = new Contact(LastName='Test Contact');
        insert contact;
        Case cs = new Case();
        cs.ContactId = contact.Id;
        cs.AccountId = null;
        cs.Status = 'Working';
        cs.Origin = 'New Contact';
        insert cs;
        List<Case> beforDeleteCases = [SELECT Id From Case WHERE ContactId = :contact.Id];

        Test.startTest();
        Database.DeleteResult result = Database.delete(contact, false);
        Test.stopTest();

        List<Case> afterDeleteCases = [SELECT Id From Case WHERE ContactId = :contact.Id];
        System.assertEquals(1, beforDeleteCases.size(), 'Expected 1 related case');
        System.assert((result.isSuccess() && afterDeleteCases.isEmpty()), 'Should be delete contact and related case');
    }

    @isTest static void testDeleteContactWithManyCases() {

        Contact contact = new Contact(LastName='Test Contact');
        insert contact;
        List<Case> casesToInsert = new List<Case> ();
        for (Integer i = 0; i < 5; i++) {
            Case cs = new Case();
            cs.ContactId = contact.Id;
            cs.AccountId = null;
            cs.Status = 'Working';
            cs.Origin = 'New Contact' + i;
            casesToInsert.add(cs);
        }
        insert casesToInsert;
        List<Case> beforDeleteCases = [SELECT Id From Case WHERE ContactId = :contact.Id];

        Test.startTest();
        Database.DeleteResult result = Database.delete(contact, false);
        Test.stopTest();

        List<Case> afterDeleteCases = [SELECT Id From Case WHERE ContactId = :contact.Id];
        System.assertEquals(5, beforDeleteCases.size(), 'Expected 5 related cases');
        System.assert((result.isSuccess() && afterDeleteCases.isEmpty()), 'Should be delete contact and related cases');
    }

}
