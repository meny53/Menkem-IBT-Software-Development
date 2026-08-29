const form = document.querySelector("#signupForm");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const ethiopianPhoneRegex = /^(\+251|0)9\d{8}$/;

    if (name.length < 2) {
        error.textContent = "Name must be at least 2 characters.";
        return;
    }

    if (!ethiopianPhoneRegex.test(phone)) {
        error.textContent = "Please enter a valid Ethiopian phone number.";
        return;
    }

    error.textContent = "Valid information.";
});