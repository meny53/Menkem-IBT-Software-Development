from abc import ABC, abstractmethod
class Observer(ABC):
    @abstractmethod
    def update(self, message):
        pass
class Customer(Observer):
    def __init__(self, name):
        self.name = name
    def update(self, message):
        print(f"{self.name} received notification: {message}")
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance
        self._observers = []
    @property
    def balance(self):
        return self._balance
    def attach(self, observer):
        self._observers.append(observer)
    def notify(self, message):
        for observer in self._observers:
            observer.update(message)
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            self.notify(f"{amount} ETB deposited.")
    def withdraw(self, amount):
        if amount <= self._balance:
            self._balance -= amount
            self.notify(f"{amount} ETB withdrawn.")
        else:
            print("Insufficient balance.")
    def display(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance} ETB")
class SavingsAccount(Account):
    def add_interest(self, rate):
        interest = self.balance * rate / 100
        self.deposit(interest)
class CheckingAccount(Account):
    def withdraw(self, amount):
        fee = 10
        super().withdraw(amount + fee)
class AccountFactory:
    @staticmethod
    def create_account(account_type, owner, balance):
        if account_type.lower() == "savings":
            return SavingsAccount(owner, balance)
        elif account_type.lower() == "checking":
            return CheckingAccount(owner, balance)
        else:
            return Account(owner, balance)
class Bank:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.accounts = []
        return cls._instance
    def add_account(self, account):
        self.accounts.append(account)
bank = Bank()
customer = Customer("Menkem")
account = AccountFactory.create_account("savings", "Menkem", 1000)
account.attach(customer)
bank.add_account(account)
account.display()
account.deposit(500)
account.add_interest(5)
account.withdraw(300)
account.display()