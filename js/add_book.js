document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#add_book_form");
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
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        };

        try {
            const response = await fetch("http://localhost:8000/books/", options);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
        window.location.href = "index.html";
    });
});