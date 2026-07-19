class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    def describe(self):
        print(f'"{self.title}" by {self.author} has {self.pages} pages.')
book1 = Book("The Alchemist", "Paulo Coelho", 208)
book2 = Book("Atomic Habits", "James Clear", 320)
book1.describe()
book2.describe()