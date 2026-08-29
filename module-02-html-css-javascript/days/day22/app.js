const state = {
    rates: {},
    watchlist: [],
    currency: ""
};

const status = document.querySelector("#status");
const form = document.querySelector("#convertForm");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const result = document.querySelector("#result");
const watchlist = document.querySelector("#watchlist");


// Render currencies
function render() {
    currencySelect.innerHTML = "";

    for (const currency in state.rates) {
        const option = document.createElement("option");

        option.value = currency;
        option.textContent = currency;

        currencySelect.appendChild(option);
    }

    // Restore the saved currency
    if (state.currency && state.rates[state.currency]) {
        currencySelect.value = state.currency;
    }
}


// Load live ETB exchange rates
async function loadRates() {
    status.textContent = "Loading rates...";

    try {
        const res = await fetch(
            "https://api.frankfurter.dev/v1/latest?base=EUR"
        );

        if (!res.ok) {
            throw new Error("Failed to load exchange rates");
        }

        const data = await res.json();

        state.rates = data.rates;

        // Use saved currency if available,
        // otherwise use the first available currency
        if (!state.currency || !state.rates[state.currency]) {
            state.currency = Object.keys(state.rates)[0];
        }

        render();

        status.textContent = "Rates loaded successfully.";
    } catch (error) {
        status.textContent = "Error loading rates.";
        console.error(error);
    }
}


// Convert form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const currency = currencySelect.value;

    // Validate amount
    if (!Number.isFinite(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    const rate = state.rates[currency];

    if (!rate) {
        result.textContent = "Currency rate not found.";
        return;
    }

    // Update state
    state.currency = currency;
    save();

    const convertedAmount = amount * rate;

    result.textContent =
        `${amount.toFixed(2)} ETB = ${convertedAmount.toFixed(2)} ${currency}`;
});


// Save selected currency when changed
currencySelect.addEventListener("change", function () {
    state.currency = currencySelect.value;
    save();
});


// Render watchlist
function renderWatchlist() {
    watchlist.innerHTML = "";

    if (state.watchlist.length === 0) {
        watchlist.innerHTML = "<li>Your watchlist is empty.</li>";
        return;
    }

    for (const currency of state.watchlist) {
        const li = document.createElement("li");

        li.dataset.c = currency;

        li.innerHTML = `
            ${currency}
            <button type="button" data-c="${currency}">
                Remove
            </button>
        `;

        watchlist.appendChild(li);
    }
}


// Add button
const addButton = document.createElement("button");

addButton.type = "button";
addButton.textContent = "Add to Watchlist";

form.appendChild(addButton);

addButton.addEventListener("click", function () {
    const currency = currencySelect.value;

    if (!currency) {
        return;
    }

    // Prevent duplicates
    if (state.watchlist.includes(currency)) {
        return;
    }

    state.watchlist.push(currency);

    save();
    renderWatchlist();
});


// Remove button using event delegation
watchlist.addEventListener("click", function (event) {
    if (event.target.matches("button[data-c]")) {
        const currency = event.target.dataset.c;

        state.watchlist = state.watchlist.filter(function (item) {
            return item !== currency;
        });

        save();
        renderWatchlist();
    }
});


// Save data to localStorage
function save() {
    localStorage.setItem(
        "watchlist",
        JSON.stringify(state.watchlist)
    );

    localStorage.setItem(
        "currency",
        state.currency
    );
}


// Load data from localStorage
function load() {
    const savedWatchlist = localStorage.getItem("watchlist");
    const savedCurrency = localStorage.getItem("currency");

    if (savedWatchlist) {
        state.watchlist = JSON.parse(savedWatchlist);
    }

    if (savedCurrency) {
        state.currency = savedCurrency;
    }

    renderWatchlist();
}


// Initialize app
function init() {
    load();
    loadRates();
}

init();