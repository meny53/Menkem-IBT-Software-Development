class Account:
    def __init__(self, account_number, owner, balance):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.transaction_history = []  # Stack
    def deposit(self, amount):
        self.balance += amount
        self.transaction_history.append(f"Deposited {amount} ETB")
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self.transaction_history.append(f"Withdrew {amount} ETB")
        else:
            print("Insufficient balance.")
    def show_history(self):
        print(f"\nTransaction History for {self.owner}")
        for transaction in reversed(self.transaction_history):
            print(transaction)
    def display(self):
        print(f"\nAccount Number: {self.account_number}")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance} ETB")
class Bank:
    def __init__(self):
        self.accounts = {}  # Dictionary
    def add_account(self, account):
        self.accounts[account.account_number] = account
    def find_account(self, account_number):
        return self.accounts.get(account_number)
    def display_all(self):
        for account in self.accounts.values():
            account.display()
bank = Bank()
acc1 = Account("1001", "Menkem", 1000)
acc2 = Account("1002", "Sam", 2000)
bank.add_account(acc1)
bank.add_account(acc2)
acc1.deposit(500)
acc1.withdraw(200)
account = bank.find_account("1001")
if account:
    account.display()
    account.show_history()
else:
    print("Account not found.")