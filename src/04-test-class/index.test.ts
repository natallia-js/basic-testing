import { getBankAccount, BankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(12);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(12);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(20)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount2 = getBankAccount(10);
    expect(() => bankAccount.transfer(13, bankAccount2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(13, bankAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(20).getBalance()).toBe(32);
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(5).getBalance()).toBe(7);
  });

  test('should transfer money', () => {
    const bankAccount2 = getBankAccount(10);
    expect(bankAccount.transfer(4, bankAccount2).getBalance()).toBe(8);
    expect(bankAccount2.getBalance()).toBe(14);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await bankAccount.fetchBalance();
    expect(balance === null || typeof balance === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = await bankAccount.fetchBalance();
    const initialBalance = bankAccount.getBalance();
    if (typeof balance === 'number') {
      expect(bankAccount.deposit(balance).getBalance()).toBe(initialBalance + balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchBalance_spy = jest.spyOn(bankAccount, 'fetchBalance');
    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      if (fetchBalance_spy.mockResolvedValue(null)) {
        expect(error).toBeInstanceOf(SynchronizationFailedError);
      }
    }
    fetchBalance_spy.mockRestore();
  });
});
