import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import "./Pages.css";

const Pages = observer(() => {
  const { book } = useContext(Context);
  const PageCount = Math.ceil(book.totalCount / book.limit);
  const pages = [];
  for (let i = 0; i < PageCount; i++) {
    pages.push(i + 1);
  }

  if (PageCount <= 1) {
    return null;
  }

  return (
    <div>
      <div className="pagination-styles pagination mt-5">
        {pages.map((page) => {
          if (PageCount <= 3 || page === 1 || page === PageCount || (page >= book.page - 1 && page <= book.page + 1)) {
            return (
              <div
                key={page}
                className={book.page === page ? "active-item-styles pagination-item-styles" : "pagination-item-styles"}
                onClick={() => book.setPage(page)}
              >
                {page}
              </div>
            );
          } else if (page === book.page - 2 || page === book.page + 2) {
            return (
              <div key={page} className="pagination-item-styles">
                ...
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
});

export default Pages;
