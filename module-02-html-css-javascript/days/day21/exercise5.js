if (name.length < 2) {
    error.textContent = "Name must be at least 2 characters.";
    return;
}

if (!ethiopianPhoneRegex.test(phone)) {
    error.textContent = "Please enter a valid Ethiopian phone number.";
    return;
}