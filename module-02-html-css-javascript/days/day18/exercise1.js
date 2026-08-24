const prices = [500, 800, 1200, 300, 1500];

// Add 15% VAT to every price
const pricesWithVat = prices.map(price => price * 1.15);

// Keep only prices under 1000
const under1000 = pricesWithVat.filter(price => price < 1000);

// Add everything together
const grandTotal = under1000.reduce((total, price) => total + price, 0);

console.log("Prices with VAT:", pricesWithVat);
console.log("Prices under 1000:", under1000);
console.log("Grand Total:", grandTotal);