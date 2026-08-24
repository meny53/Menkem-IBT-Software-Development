// ==========================================
// 1. DEFAULT PARAMETER + ARROW FUNCTION
// ==========================================

// Regular function with a default parameter
function vat(amount, rate = 0.15) {
    return amount * rate;
}


// Arrow function with an implicit return
const vatArrow = (amount, rate = 0.15) => amount * rate;


// Test the functions
const amount = 1000;

const normalVat = vat(amount);

const arrowVat = vatArrow(amount);


document.querySelector("#vatResult").textContent =
    `Regular function: ${normalVat} ETB | Arrow function: ${arrowVat} ETB`;


// ==========================================
// 2. CLOSURE
// ==========================================

function makeCounter() {

    let count = 0;

    return function () {

        count++;

        return count;

    };

}


// Create a counter
const counter = makeCounter();


const first = counter();

const second = counter();

const third = counter();


/*
The count stays private because count is declared
inside makeCounter(). Code outside the function
cannot directly access it.

The returned function remembers count because
of the closure.
*/


document.querySelector("#counterResult").textContent =
    `Counter calls: ${first}, ${second}, ${third}`;


// ==========================================
// 3. DISCOUNT FACTORY
// ==========================================

function discountBy(rate) {

    return function (price) {

        return price - (price * rate);

    };

}


// Create discount functions
const memberPrice = discountBy(0.10);

const salePrice = discountBy(0.30);


// Apply both discounts to 1000 ETB
const originalPrice = 1000;

const memberResult = memberPrice(originalPrice);

const saleResult = salePrice(originalPrice);


document.querySelector("#discountResult").textContent =
    `Original: ${originalPrice} ETB | Member price: ${memberResult} ETB | Sale price: ${saleResult} ETB`;


// ==========================================
// 4. HIGHER-ORDER FUNCTION
// ==========================================

function applyToAll(list, fn) {

    const results = [];

    list.forEach(function (item) {

        results.push(fn(item));

    });

    return results;

}


// Array of prices
const prices = [100, 500, 1000, 2000];


// Function that adds 15% VAT
const addVat = price => price + (price * 0.15);


// Apply addVat to every price
const pricesWithVat = applyToAll(prices, addVat);


document.querySelector("#higherOrderResult").textContent =
    `Original prices: ${prices.join(", ")} ETB | Prices with VAT: ${pricesWithVat.join(", ")} ETB`;


// ==========================================
// 5. forEach() WITH INDEX
// ==========================================

const cities = [
    "Addis Ababa",
    "Mekelle",
    "Bahir Dar",
    "Hawassa"
];


const cityList = document.querySelector("#cityList");


cities.forEach(function (city, index) {

    const li = document.createElement("li");

    li.textContent = `${index + 1}. ${city}`;

    cityList.appendChild(li);

});