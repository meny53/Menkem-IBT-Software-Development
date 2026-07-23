def customer_status(balance):
    if balance >= 1000:
        return "Gold Customer"
    elif balance >= 500:
        return "Silver Customer"
    else:
        return "Regular Customer"
customers = int(input("Enter number of customers: "))
for i in range(customers):
    print(f"\nCustomer {i + 1}")
    name = input("Enter customer name: ")
    balance = float(input("Enter TeleBirr balance (ETB): "))
    status = customer_status(balance)
    print("\n----- Customer Report -----")
    print("Name:", name)
    print("Balance:", balance, "ETB")
    print("Status:", status)