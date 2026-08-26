const statusElement = document.getElementById("status");

async function loadData() {
    // STATE 1: Loading
    statusElement.textContent = "Loading...";

    try {
        const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1"
);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const post = await response.json();

        // STATE 2: Success
        statusElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;

    } catch (error) {

        // STATE 3: Error
        statusElement.textContent =
            `Error: ${error.message}`;
    }
}

loadData();