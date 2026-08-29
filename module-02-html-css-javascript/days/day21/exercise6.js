// -------------------------
// Exercise 1: Theme
// -------------------------

const themeToggle = document.querySelector("#themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const currentTheme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", currentTheme);
});


// -------------------------
// Exercise 2: Save / Load
// -------------------------

function save(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function load(key) {
    try {
        const data = localStorage.getItem(key);

        if (data === null) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}


// -------------------------
// Exercise 3, 4, 5, 6
// Signup Form
// -------------------------

const form = document.querySelector("#signupForm");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");
const count = document.querySelector("#count");

const people = load("people");

count.textContent = `${people.length} people have signed up.`;


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const ethiopianPhoneRegex = /^(\+251|0)9\d{8}$/;

    // Validate name
    if (name.length < 2) {
        error.textContent = "Name must be at least 2 characters.";
        return;
    }

    // Validate phone
    if (!ethiopianPhoneRegex.test(phone)) {
        error.textContent = "Please enter a valid Ethiopian phone number.";
        return;
    }

    // Create signup entry
    const newPerson = {
        name: name,
        phone: phone
    };

    // Save entry
    people.push(newPerson);
    save("people", people);

    // Clear form
    form.reset();

    // Clear error
    error.textContent = "";

    // Update count
    count.textContent = `${people.length} people have signed up.`;
});