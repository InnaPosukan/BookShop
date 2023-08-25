import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import BookItem from "../BookItem/BookItem";
import { useSearch } from '../Context/searchContext';

const BookList = observer(() => {
  const { book } = useContext(Context);
  const { searchQuery } = useSearch();

  const filteredBooks = book.books
    ? book.books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      {filteredBooks.length > 0 ? (
        <div className="d-flex flex-wrap">
          {filteredBooks.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
});

export default BookList;
