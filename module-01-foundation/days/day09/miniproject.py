from collections import deque
class Account:
    def __init__(self, account_number, owner, balance):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.transaction_history = []

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
        print(f"{self.account_number} - {self.owner} - {self.balance} ETB")
class Bank:
    def __init__(self):
        self.accounts = {}

    def add_account(self, account):
        self.accounts[account.account_number] = account

    def find_account(self, account_number):
        return self.accounts.get(account_number)
class Branch:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance
        self.left = None
        self.right = None
def total_balance(branch):
    if branch is None:
        return 0

    return (
        branch.balance
        + total_balance(branch.left)
        + total_balance(branch.right))
class TransferGraph:
    def __init__(self):
        self.graph = {}

    def add_transfer(self, from_account, to_account):
        if from_account not in self.graph:
            self.graph[from_account] = []

        self.graph[from_account].append(to_account)

    def bfs(self, start):
        visited = set()
        queue = deque([start])

        while queue:
            account = queue.popleft()

            if account not in visited:
                visited.add(account)

                for neighbor in self.graph.get(account, []):
                    queue.append(neighbor)

        return visited
bank = Bank()
acc1 = Account("1001", "Menkem", 1500)
acc2 = Account("1002", "Sam", 1000)
acc3 = Account("1003", "Sara", 2500)
bank.add_account(acc1)
bank.add_account(acc2)
bank.add_account(acc3)
print("=== Accounts ===")
for account in bank.accounts.values():
    account.display()
root = Branch("Head Office", 5000)
root.left = Branch("North Branch", 2500)
root.right = Branch("South Branch", 3500)
root.left.left = Branch("East Branch", 1500)
root.left.right = Branch("West Branch", 1000)
print("\nTotal Branch Balance:", total_balance(root), "ETB")
graph = TransferGraph()
graph.add_transfer("1001", "1002")
graph.add_transfer("1002", "1003")
graph.add_transfer("1001", "1003")
print("\nAccounts Reachable from 1001:")
print(graph.bfs("1001"))