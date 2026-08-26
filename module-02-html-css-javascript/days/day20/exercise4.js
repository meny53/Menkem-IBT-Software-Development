async function getUsersAndDetails() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const users = await response.json();

        const firstTwoUsers = users.slice(0, 2);

        const requests = firstTwoUsers.map(user =>
            fetch(
                `https://jsonplaceholder.typicode.com/users/${user.id}`
            ).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                return response.json();
            })
        );

        const details = await Promise.all(requests);

        console.log("First two users:");
        console.log(details);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

getUsersAndDetails();