async function deleteBook(id) {
    try {
        const response = await fetch(`http://localhost:8000/books/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
    window.location.reload();
};

document.addEventListener("DOMContentLoaded", async function () {
    const books_list = document.querySelector("#read_books");
    try {
        const response = await fetch("http://localhost:8000/books");
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const books = await response.json();
        books.forEach((book) => {
            const li = document.createElement("li");

            const deleteLink = document.createElement("a");
            deleteLink.href = "#";
            deleteLink.textContent = "Delete";
            deleteLink.addEventListener("click", deleteBook.bind(null, book.id));

            li.appendChild(deleteLink);

            li.appendChild(document.createTextNode(" - "));

            const output = book.title + " - " + book.author + " - " + book.rating + "/10";
            const p = document.createElement("p");
            p.style.display = "inline";
            const pContent = document.createTextNode(output);
            p.appendChild(pContent);
            li.appendChild(p);

            li.appendChild(document.createTextNode(" - "));

            const editLink = document.createElement("a");
            editLink.href = `edit_book.html?id=${book.id}`;
            editLink.textContent = "Edit";
            li.appendChild(editLink);

            books_list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
});