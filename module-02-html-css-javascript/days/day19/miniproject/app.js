

        // ==========================================
        // SELECT ELEMENTS
        // ==========================================

        const form = document.querySelector("#shoppingForm");

        const itemName = document.querySelector("#itemName");

        const itemPrice = document.querySelector("#itemPrice");

        const shoppingList = document.querySelector("#shoppingList");

        const totalPrice = document.querySelector("#totalPrice");

        const errorMessage = document.querySelector("#errorMessage");


        // ==========================================
        // STORE SHOPPING ITEMS
        // ==========================================

        const items = [];


        // ==========================================
        // ADD ITEM
        // ==========================================

        form.addEventListener("submit", function(event) {

            // Prevent page refresh
            event.preventDefault();


            // Get values from the inputs
            const name = itemName.value.trim();

            const price = Number(itemPrice.value);


            // Validate the inputs
            if (name === "" || itemPrice.value === "") {

                errorMessage.textContent =
                    "Please enter both the item name and price.";

                return;
            }


            // Remove error message
            errorMessage.textContent = "";


            // Create an item object
            const item = {
                name: name,
                price: price
            };


            // Add item to the array
            items.push(item);


            // Display the item
            renderItem(item);


            // Update total
            updateTotal();


            // Clear form
            form.reset();

        });


        // ==========================================
        // RENDER ONE ITEM
        // ==========================================

        function renderItem(item) {

            // Create the list row
            const li = document.createElement("li");

            li.classList.add("shopping-item");


            // Create item name
            const nameSpan = document.createElement("span");

            nameSpan.textContent = item.name;


            // Create price
            const priceSpan = document.createElement("span");

            priceSpan.textContent = item.price + " ETB";


            // Create Bought button
            const boughtButton = document.createElement("button");

            boughtButton.textContent = "Bought";

            boughtButton.classList.add("bought-btn");


            // Create Delete button
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.classList.add("delete-btn");


            // Add everything to the row
            li.appendChild(nameSpan);

            li.appendChild(priceSpan);

            li.appendChild(boughtButton);

            li.appendChild(deleteButton);


            // Add row to the shopping list
            shoppingList.appendChild(li);

        }


        // ==========================================
        // EVENT DELEGATION
        // ==========================================

        shoppingList.addEventListener("click", function(event) {

            const row = event.target.parentElement;


            // Bought button
            if (event.target.classList.contains("bought-btn")) {

                row.classList.toggle("bought");

            }


            // Delete button
            if (event.target.classList.contains("delete-btn")) {

                const priceText =
                    row.children[1].textContent;

                const price =
                    Number(priceText.replace(" ETB", ""));


                // Remove item from the array
                const index = Array.from(shoppingList.children)
                    .indexOf(row);

                items.splice(index, 1);


                // Remove row from page
                row.remove();


                // Update total
                updateTotal();

            }

        });


        // ==========================================
        // UPDATE TOTAL
        // ==========================================

        function updateTotal() {

            const total = items.reduce(function(sum, item) {

                return sum + item.price;

            }, 0);


            totalPrice.textContent = total + " ETB";

        }

   