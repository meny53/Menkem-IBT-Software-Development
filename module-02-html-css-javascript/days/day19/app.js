

        // ==========================================
        // QUESTION 1
        // textContent + classList.toggle
        // ==========================================

        const title = document.querySelector("#title");

        title.textContent = "Ethiopian City & Item Manager";

        title.classList.toggle("highlight");


        // ==========================================
        // QUESTION 2
        // createElement + appendChild
        // ==========================================

        const cities = [
            "Addis Ababa",
            "Mekelle",
            "Bahir Dar"
        ];

        const cityList = document.querySelector("#cityList");

        cities.forEach(function(city) {

            const li = document.createElement("li");

            li.textContent = city;

            cityList.appendChild(li);

        });


        // ==========================================
        // QUESTION 3
        // Event target + event bubbling
        // ==========================================

        const button = document.querySelector("#clickButton");

        const container = document.querySelector("#buttonContainer");


        button.addEventListener("click", function(event) {

            console.log("Button clicked");

            console.log("event.target:", event.target);

        });


        container.addEventListener("click", function() {

            console.log("Div clicked because the event bubbled up");

        });


        // ==========================================
        // QUESTION 4
        // Event delegation
        // ==========================================

        const itemList = document.querySelector("#itemList");


        itemList.addEventListener("click", function(event) {

            if (event.target.classList.contains("delete-btn")) {

                event.target.parentElement.remove();

            }

        });


        // ==========================================
        // QUESTION 5
        // Form + preventDefault + input.value
        // ==========================================

        const form = document.querySelector("#itemForm");

        const input = document.querySelector("#itemInput");


        form.addEventListener("submit", function(event) {

            // Stop the page from refreshing
            event.preventDefault();


            // Get the user's input
            const value = input.value;


            // Make sure the input is not empty
            if (value.trim() !== "") {

                // Create a new list item
                const li = document.createElement("li");

                li.textContent = value + " ";


                // Create delete button
                const deleteButton = document.createElement("button");

                deleteButton.textContent = "Delete";

                deleteButton.classList.add("delete-btn");


                // Put the button inside the li
                li.appendChild(deleteButton);


                // Put the li inside the list
                itemList.appendChild(li);


                // Clear the input
                input.value = "";

            }

        });

   