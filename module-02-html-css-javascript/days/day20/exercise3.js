async function wrongUrlTest() {
    try {
        const response = await fetch(
            "https://this-url-does-not-exist-example.com"
        );

        console.log(response);

    } catch (error) {
        console.log("Catch block ran!");
        console.log(error.message);
    }
}

wrongUrlTest();


async function notFoundTest() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/999999"
        );

        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log("404 catch block ran!");
        console.log(error.message);
    }
}

notFoundTest();