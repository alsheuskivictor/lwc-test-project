trigger DeleteAccountOpportunity on Account (before delete) {

    List<Opportunity> opportunities = [SELECT Id FROM Opportunity WHERE AccountId IN :Trigger.old];
    if (opportunities.size() > 0) {
        delete opportunities;
    }

}