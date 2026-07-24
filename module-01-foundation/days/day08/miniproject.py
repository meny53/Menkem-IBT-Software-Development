class Account:
    def __init__(self, account_number, owner, balance):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.transaction_history = []  # Stack
    def deposit(self, amount):
        self.balance += amount
        self.transaction_history.append(amount)
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self.transaction_history.append(-amount)
        else:
            print("Insufficient balance.")
    def display(self):
        print(f"Account: {self.account_number}")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance} ETB")
class Bank:
    def __init__(self):
        self.accounts = {}  # Dictionary for O(1) lookup
    def add_account(self, account):
        self.accounts[account.account_number] = account
    def find_account(self, account_number):
        return self.accounts.get(account_number)
    def balance_leaderboard(self):
        return sorted(
            self.accounts.values(),
            key=lambda account: account.balance,
            reverse=True)
    def binary_search_account(self, account_number):
        account_list = sorted(
            self.accounts.values(),
            key=lambda account: account.account_number)
        left = 0
        right = len(account_list) - 1
        while left <= right:
            middle = (left + right) // 2
            if account_list[middle].account_number == account_number:
                return account_list[middle]
            elif account_list[middle].account_number < account_number:
                left = middle + 1
            else:
                right = middle - 1
        return None
def recursive_total(transactions):
    if len(transactions) == 0:
        return 0
    return transactions[0] + recursive_total(transactions[1:])
bank = Bank()
acc1 = Account("1001", "Menkem", 1200)
acc2 = Account("1002", "Sam", 800)
acc3 = Account("1003", "Sara", 2000)
bank.add_account(acc1)
bank.add_account(acc2)
bank.add_account(acc3)
acc1.deposit(500)
acc1.withdraw(200)
print("=== Balance Leaderboard ===")
for account in bank.balance_leaderboard():
    print(account.owner, "-", account.balance, "ETB")
print("\n=== Binary Search ===")
account = bank.binary_search_account("1002")
if account:
    account.display()
else:
    print("Account not found.")
print("\n=== Recursive Transaction Total ===")
print(recursive_total(acc1.transaction_history))