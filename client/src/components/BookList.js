import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import BookItem from "./BookItem";

const BookList = observer(() => {
  const { book } = useContext(Context);

  return (
    <div className="d-flex flex-wrap">
      {book.books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
});

export default BookList;
