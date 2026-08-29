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
const addButton = document.querySelector("#addButton");


// -------------------------
// Render
// -------------------------

function render() {
    currencySelect.innerHTML = "";

    for (const currency in state.rates) {
        const option = document.createElement("option");

        option.value = currency;
        option.textContent = currency;

        currencySelect.appendChild(option);
    }

    if (state.currency && state.rates[state.currency]) {
        currencySelect.value = state.currency;
    }
}


// -------------------------
// Load live rates
// -------------------------

async function loadRates() {
    status.textContent = "Loading rates...";

    try {
        const response = await fetch(
            "https://api.frankfurter.dev/v1/latest?base=EUR"
        );

        if (!response.ok) {
            throw new Error("Failed to load exchange rates");
        }

        const data = await response.json();

        state.rates = data.rates;

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


// -------------------------
// Convert
// -------------------------

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const currency = currencySelect.value;

    if (!Number.isFinite(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    const rate = state.rates[currency];

    if (!rate) {
        result.textContent = "Currency rate not found.";
        return;
    }

    state.currency = currency;

    save();

    const convertedAmount = amount * rate;

    result.textContent =
        `${amount.toFixed(2)} EUR = ${convertedAmount.toFixed(2)} ${currency}`;
});


// -------------------------
// Currency selection
// -------------------------

currencySelect.addEventListener("change", function () {
    state.currency = currencySelect.value;

    save();
});


// -------------------------
// Watchlist rendering
// -------------------------

function renderWatchlist() {
    watchlist.innerHTML = "";

    if (state.watchlist.length === 0) {
        const emptyMessage = document.createElement("li");

        emptyMessage.textContent = "Your watchlist is empty.";

        watchlist.appendChild(emptyMessage);

        return;
    }

    for (const currency of state.watchlist) {
        const li = document.createElement("li");

        li.dataset.c = currency;

        li.innerHTML = `
            <span>${currency}</span>
            <button type="button" data-c="${currency}">
                Remove
            </button>
        `;

        watchlist.appendChild(li);
    }
}


// -------------------------
// Add to watchlist
// -------------------------

addButton.addEventListener("click", function () {
    const currency = currencySelect.value;

    if (!currency) {
        return;
    }

    if (state.watchlist.includes(currency)) {
        return;
    }

    state.watchlist.push(currency);

    save();

    renderWatchlist();
});


// -------------------------
// Remove from watchlist
// -------------------------

watchlist.addEventListener("click", function (event) {
    if (!event.target.matches("button[data-c]")) {
        return;
    }

    const currency = event.target.dataset.c;

    state.watchlist = state.watchlist.filter(function (item) {
        return item !== currency;
    });

    save();

    renderWatchlist();
});


// -------------------------
// localStorage
// -------------------------

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


// -------------------------
// Initialize
// -------------------------

function init() {
    load();
    loadRates();
}

init();