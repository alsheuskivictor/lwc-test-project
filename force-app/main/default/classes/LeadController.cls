public with sharing class LeadController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getLeads(String searchName) {

        List<Lead> leads;
        leads = [
            SELECT Id, Name, Title, Phone
            FROM Lead
            ORDER BY Name ASC
        ];
        
        return leads;
	}

}
