stock = {
    "Bread": 20,
    "Milk": 15,
    "Eggs": 30,
    "Sugar": 10,
    "Rice": 25}
with open("stock.txt", "w") as file:
    for item, quantity in stock.items():
        file.write(f"{item}: {quantity}\n")
print("Stock saved to stock.txt\n")
print("Current Stock")
try:
    with open("stock.txt", "r") as file:
        for line in file:
            print(line.strip())
except FileNotFoundError:
    print("Stock file not found.")
while True:
    item = input("\nEnter an item to check (or 'exit' to quit): ")
    if item.lower() == "exit":
        print("Goodbye!")
        break
    try:
        print(f"{item} has {stock[item]} in stock.")
    except KeyError:
        print("Item not found.")