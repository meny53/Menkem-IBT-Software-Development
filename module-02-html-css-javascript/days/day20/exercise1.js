async function getUsdToEtbRate() {
    const response = await fetch(
        "https://api.frankfurter.dev/v2/rate/USD/ETB?providers=NBE"
    );

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data.rate;
}

getUsdToEtbRate()
    .then(rate => {
        console.log(`1 USD = ${rate} ETB`);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });