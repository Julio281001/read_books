const books_list = document.querySelector("#read_books");

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:8000/books");
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const books = await response.json();
        books.forEach((book) => {
            const output = book.title + " - " + book.author + " - " + book.rating + "/10";
            const li = document.createElement("li");
            const p = document.createElement("p");
            const pContent = document.createTextNode(output);
            p.appendChild(pContent);
            li.appendChild(p);
            books_list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
});