trigger DeleteAccountCases on Account (before delete) {

    List<Case> cases = [SELECT Id FROM Case WHERE AccountId IN :Trigger.old];
    if (cases.size() > 0) {
        delete cases;
    }

}