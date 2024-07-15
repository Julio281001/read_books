const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookId = urlParams.get('id');

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#edit_book_form");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const rating = document.querySelector("#rating").value;
        const book = {
            title: title,
            author: author,
            rating: rating
        };

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        };

        try {
            const response = await fetch(`http://localhost:8000/books/${bookId}`, options);
        } catch (error) {
            console.error(error);
        }
        window.location.href = "index.html";
    });
});