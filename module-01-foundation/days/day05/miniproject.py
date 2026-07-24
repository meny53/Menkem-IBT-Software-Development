class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance
    @property
    def balance(self):
        return self.__balance
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited {amount} ETB.")
        else:
            print("Invalid deposit amount.")
    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            print(f"Withdrew {amount} ETB.")
        else:
            print("Insufficient balance.")
    def display(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance} ETB")
class SavingsAccount(Account):
    def add_interest(self, rate):
        interest = self.balance * rate / 100
        self.deposit(interest)
        print(f"Interest of {interest} ETB added.")
class CheckingAccount(Account):
    def withdraw(self, amount):
        fee = 10
        total = amount + fee
        if total <= self.balance:
            super().withdraw(total)
            print(f"Transaction fee: {fee} ETB")
        else:
            print("Insufficient balance including transaction fee.")
print("=== Savings Account ===")
savings = SavingsAccount("Menkem", 1000)
savings.display()
savings.deposit(500)
savings.add_interest(5)
savings.display()
print("\n=== Checking Account ===")
checking = CheckingAccount("Sam", 1000)
checking.display()
checking.withdraw(300)
checking.display()