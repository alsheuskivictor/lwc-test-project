@isTest
public class LeadControllerTest {

    @isTest static void testGetLeads() {
        
        Integer numberOfLeads = 10;
        List<Lead> leadsToInsert = new List<Lead>();
        for ( Integer i=0; i<numberOfLeads; i++ ) {
            Lead lead = new Lead(LastName='Test' + i, Company='c' + i);
            leadsToInsert.add(lead);
        }
        if (!leadsToInsert.isEmpty()) {
            insert leadsToInsert;
        }
        
        Test.startTest();
        List<Lead> returnedLeads = LeadController.getLeads();
        Test.stopTest();

        System.assertEquals(numberOfLeads, returnedLeads.size(), 'Should be returned ' + numberOfLeads + 
            ' Leads');
    }

}
