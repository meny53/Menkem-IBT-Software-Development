function save(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function load(key) {
    try {
        const data = localStorage.getItem(key);
console.log(load("people"));
        if (data === null) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}