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
            print("Deposit amount must be greater than 0.")
    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be greater than 0.")
        elif amount > self.__balance:
            print("Insufficient balance.")
        else:
            self.__balance -= amount
            print(f"Withdrew {amount} ETB.")
    def display(self):
        print("\n----- Account Details -----")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.__balance} ETB")
account = Account("Menkem", 1000)
account.display()
account.deposit(500)
account.display()
account.withdraw(300)
account.display()
account.withdraw(2000)