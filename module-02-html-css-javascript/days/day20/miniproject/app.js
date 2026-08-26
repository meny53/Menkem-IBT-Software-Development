const form = document.getElementById("countryForm");
const input = document.getElementById("countryInput");
const status = document.getElementById("status");
const countryInfo = document.getElementById("countryInfo");


async function getCountry(countryName) {
    status.textContent = "Loading...";
    countryInfo.innerHTML = "";

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();

        const country = data[0];

        const capital = country.capital
            ? country.capital[0]
            : "N/A";

        const currencies = country.currencies
            ? Object.values(country.currencies)
                .map(currency => currency.name)
                .join(", ")
            : "N/A";

        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>

            <img
                src="${country.flags.png}"
                alt="Flag of ${country.name.common}"
                width="200"
            >

            <p>
                <strong>Capital:</strong>
                ${capital}
            </p>

            <p>
                <strong>Population:</strong>
                ${country.population.toLocaleString()}
            </p>

            <p>
                <strong>Region:</strong>
                ${country.region}
            </p>

            <p>
                <strong>Currencies:</strong>
                ${currencies}
            </p>
        `;

        status.textContent = "";

    } catch (error) {
        status.textContent = "Country not found. Please try again.";
        countryInfo.innerHTML = "";
    }
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const countryName = input.value.trim();

    if (countryName === "") {
        status.textContent = "Please enter a country name.";
        return;
    }

    getCountry(countryName);
});


getCountry("Ethiopia");