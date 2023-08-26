import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import "./Pages.css"; // Импортируйте файл стилей

const Pages = observer(() => {
    const { book } = useContext(Context);
    const PageCount = Math.ceil(book.totalCount / book.limit);
    const pages = [];
    for (let i = 0; i < PageCount; i++) {
        pages.push(i + 1);
    }
    
    return (
        <div>  
            <div className="pagination-styles pagination mt-5">
                {pages.map((page) => (
                    <div
                        key={page}
                        className={book.page === page ? "active-item-styles pagination-item-styles" : "pagination-item-styles"}
                        onClick={() => book.setPage(page)} 
                    >
                        {page}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Pages;
