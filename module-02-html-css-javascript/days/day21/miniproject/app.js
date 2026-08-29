const form = document.querySelector("#signupForm");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");
const signupCount = document.querySelector("#signupCount");


// Save an array to localStorage
function save(entries) {
    localStorage.setItem("signups", JSON.stringify(entries));
}


// Load the array from localStorage
function load() {
    try {
        const savedData = localStorage.getItem("signups");

        if (savedData === null) {
            return [];
        }

        const entries = JSON.parse(savedData);

        if (!Array.isArray(entries)) {
            return [];
        }

        return entries;
    } catch (error) {
        return [];
    }
}


// Show how many people have signed up
function updateSignupCount() {
    const signups = load();

    signupCount.textContent = `${signups.length} people have signed up.`;
}


// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // Clear previous error
    error.textContent = "";

    // Validate name
    if (name.length < 2) {
        error.textContent = "Name must be at least 2 characters.";
        return;
    }

    // Validate Ethiopian phone number
    const ethiopianPhoneRegex = /^(?:\+251|0)9\d{8}$/;

    if (!ethiopianPhoneRegex.test(phone)) {
        error.textContent = "Please enter a valid Ethiopian phone number.";
        return;
    }

    // Load existing signups
    const signups = load();

    // Create new signup
    const newSignup = {
        name: name,
        phone: phone
    };

    // Add new signup
    signups.push(newSignup);

    // Save updated signups
    save(signups);

    // Clear the form
    form.reset();

    // Show success message
    error.textContent = "Signup successful!";

    // Update signup count
    updateSignupCount();
});


// Restore signup count when the page loads
updateSignupCount();