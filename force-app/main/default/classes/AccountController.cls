public with sharing class AccountController {

    @AuraEnabled
    public static List<Account> getAccounts() {
        return [ SELECT Id, Name, Rating FROM Account ORDER BY Name ASC ];
    }
}
