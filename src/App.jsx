import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handleAddBook(event) {
    event.preventDefault();
    if (title.trim() === "" || author.trim() === "") return;
    if (editIndex !== null) {
      // Edit mode
      const updatedBooks = books.map((book, idx) =>
        idx === editIndex ? { title, author } : book
      );
      setBooks(updatedBooks);
      setEditIndex(null);
    } else {
      // Add mode
      const newBook = { title, author };
      setBooks([...books, newBook]);
      console.log("Book added:", newBook);
    }
    setTitle("");
    setAuthor("");
  }

  function handleEditBook(index) {
    setTitle(books[index].title);
    setAuthor(books[index].author);
    setEditIndex(index);
  }

  function handleDeleteBook(index) {
    const updatedBooks = books.filter((_, idx) => idx !== index);
    setBooks(updatedBooks);
    // If deleting the book being edited, reset form
    if (editIndex === index) {
      setTitle("");
      setAuthor("");
      setEditIndex(null);
    }
  }

  return (
    <>
      <div>
        <div className="App">
          <h1>PhoneBox Gadgets Store - Cirencester UK</h1>
          <form className="book-form" onSubmit={handleAddBook}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-input"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                placeholder="Enter book title"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                className="form-input"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                id="author"
                placeholder="Enter author name"
                autoComplete="off"
              />
            </div>
            <button className="form-button" type="submit">
              {editIndex !== null ? "Update Book" : "Add Book"}
            </button>
            {editIndex !== null && (
              <button
                type="button"
                className="form-button"
                style={{ background: "#e53e3e", marginLeft: 10 }}
                onClick={() => {
                  setTitle("");
                  setAuthor("");
                  setEditIndex(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="books-container">
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}
              >
                <button
                  className="form-button"
                  style={{
                    background: "#3182ce",
                    padding: "0.4rem 1rem",
                    fontSize: "0.95rem",
                  }}
                  onClick={() => handleEditBook(index)}
                >
                  Edit
                </button>
                <button
                  className="form-button"
                  style={{
                    background: "#e53e3e",
                    padding: "0.4rem 1rem",
                    fontSize: "0.95rem",
                  }}
                  onClick={() => handleDeleteBook(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
