import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const Pages = observer(() => {
    const { book } = useContext(Context);
    const PageCount = Math.ceil(book.totalCount / book.limit);
    const pages = [];
    for (let i = 0; i < PageCount; i++) {
        pages.push(i + 1);
    }

    const paginationStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    };

    const paginationItemStyles = {
        margin: "0 5px",
        padding: "5px 10px",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "5px",
    };

    const activeItemStyles = {
        backgroundColor: "orange",
        color: "white",
        borderColor: "#dark-orange",
    };

    return (
        <div>  
            <div style={paginationStyles} className="pagination mt-5">
                {pages.map((page) => (
                    <div
                        key={page}
                        style={book.page === page ? { ...paginationItemStyles, ...activeItemStyles } : paginationItemStyles}
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
