let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
  const bookTitle = prompt("Enter a new book title:");
  if (bookTitle) {
    const book = {
      id: Date.now(),
      title: bookTitle,
      read: false,
    };
    books.push(book);
    saveBooks();
    renderBooks();
  }
}

function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  saveBooks();
  renderBooks();
}

function toggleBook(id) {
  books = books.map((book) => {
    if (book.id === id) {
      return { ...book, read: !book.read };
    }
    return book;
  });
  saveBooks();
  renderBooks();
}

function renderBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book-item";
    bookElement.innerHTML = `
            <span style="text-decoration: ${
              book.read ? "line-through" : "none"
            }"
                  onclick="toggleBook(${book.id})">
                ${book.title}
            </span>
            <button onclick="deleteBook(${book.id})">Delete</button>
        `;
    bookList.appendChild(bookElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const addBookButton = document.getElementById("addBook");
  addBookButton.addEventListener("click", addBook);
  renderBooks();
});
