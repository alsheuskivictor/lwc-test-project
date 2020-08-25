@isTest
public with sharing class AccountControlerTest {

    @isTest public static void checkGetAccounts() {
    
        List<Account> account = new List<Account>();
        account.add(new Account(Name = 'Test'));
        insert account;
                    
        Test.startTest();
        List<Account> returned = AccountController.getAccounts();
        Test.stopTest();

        List<Account> expected = [SELECT Id, Name FROM Account];
        System.assertEquals(expected, returned, 'Should return account list');
    }

    @isTest public static void checkUpdateAccount() {
           
        Account account = new Account(Name = 'Test', Rating = 'Warm');
        insert account;
        Account updatedAccount = new Account(Id = account.Id, Name = 'Updated', Rating = 'Cold');
        
        Test.startTest();
        Account returned = AccountController.updateAccount(updatedAccount);
        Test.stopTest();

        Account expected = [SELECT Name, Rating FROM Account];
        System.assertEquals(expected, returned, 'Should updated account');
    }
}
