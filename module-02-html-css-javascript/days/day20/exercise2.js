async function getPost() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const post = await response.json();

        document.body.innerHTML = `
            <h1>${post.title}</h1>
            <p>${post.body}</p>
        `;

    } catch (error) {
        console.error("Error:", error.message);
    }
}

getPost();