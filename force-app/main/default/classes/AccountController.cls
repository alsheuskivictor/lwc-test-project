public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, Rating
            FROM Account
         ];
    }

    @AuraEnabled
    public static Account updateAccount (Account updatedAccount) { 
        try {
            update updatedAccount;
         } catch(Exception e) {
            System.debug('Update wrong: ' + e);
         }
        return updatedAccount;
       
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getRatingPickListValues() {
        List<Map<String, String>> options = new List<Map<String, String>>();
        List<Schema.PicklistEntry> ratingPickList = Account.Rating.getDescribe().getPicklistValues();
        for (Schema.PicklistEntry entry :ratingPickList) {
            if (entry.isActive() == true) {
                options.add(new Map<String, String>{'label' => entry.getLabel(), 'value' => entry.getValue()});
            }
        }
        return options;
    }
}
