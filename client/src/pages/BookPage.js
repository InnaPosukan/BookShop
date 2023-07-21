import React, { useEffect, useState } from 'react';
import book1 from '../assets/book1.jpg';

const BookPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  const book = { id: 1, name: "После", author: "Анна Скотт", price: 150, rating: 5, img: book1 };
  const description = [
    { id: 1, title: 'Кількість сторінок', description: '250' },
    { id: 2, title: 'Рік написання', description: '2018' },
    { id: 3, title: 'Жанр', description: 'Фантастика' },
  ];

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobileView(isMobile);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "auto",
      position: "relative",
      fontFamily: "Inter, sans-serif"
    }}>
      {isMobileView ? (
        // Mobile view content
        <div style={{
          marginTop: "30px",
          marginBottom: "20px",
          marginRight: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "20px",
          boxSizing: "border-box",
          border: "1px solid #ddd", // Add border here for mobile view
        }}>
          <img
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px"
            }}
            src={book.img}
            alt={book.name}
          />

          <div className="info-class" style={{
            textAlign: "center",
            fontSize: "24px",
            color: "#333"
          }}>
            <h2 style={{ fontSize: "30px", fontWeight: "700", marginTop: "20px" }}>{book.name}</h2>
            <p style={{ fontSize: "10px", margin: "0" }}>{book.author}</p>
            <p style={{ fontSize: "20px", marginTop: "20px", display: "block" }}>
              Price: {book.price} грн
            </p>
            <button style={{
              marginTop: "20px",
              padding: "10px 20px",
              borderRadius: "40px",
              backgroundColor: "#FFA500",
              color: "#black",
              fontSize: "20px",
              border: "none",
              cursor: "pointer"
            }}>
              Add to Cart
            </button>

            {/* Book description for mobile view */}
            <p style={{ fontSize: "16px", marginTop: "20px" }}>
              Детальна інформація про книгу
            </p>
            
            {/* Table for the description in mobile view */}
            <table style={{ fontSize: "18px", marginTop: "10px", width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {description.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: "8px", fontSize: "16px", border: "1px solid #ddd" }}>{item.title}:</td>
                    <td style={{ padding: "8px", fontSize: "16px", border: "1px solid #ddd" }}>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Desktop view content
        <div style={{
          marginTop: "30px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "40px",
          boxSizing: "border-box",
          width: "60%",
          border: "1px solid #ddd", 
        }}>
          <div style={{ display: "flex" }}>
            <img
              style={{
                width: "100%",
                maxWidth: "270px",
                height: "auto",
                borderRadius: "8px"
              }}
              src={book.img}
              alt={book.name}
            />
            <div className="info-class" style={{
              flex: 1,
              marginLeft: "30px",
              textAlign: "center",
              fontSize: "24px",
              color: "#333",
            }}>
               <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
                <h2 style={{ fontSize: "35px", fontWeight: "700", marginBottom: "0" }}>{book.name}</h2>
                <p style={{ fontSize: "15px", margin: "10px 0" }}>Автор: {book.author}</p>
                <p style={{ fontSize: "25px", margin: "51px 0", display: "block" }}>
                  Ціна: {book.price} грн
                </p>
                <button style={{
                  margin: "10px 0",
                  padding: "10px 20px",
                  borderRadius: "40px",
                  backgroundColor: "#FFA500",
                  color: "#black",
                  fontSize: "20px",
                  border: "none",
                  cursor: "pointer",
                }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <p style={{ fontSize: "18px", marginTop: "20px", textAlign:"center" }}>
            Детальна інформація про книгу
          </p>
          <table style={{ fontSize: "18px", marginTop: "10px", width: "100%",borderCollapse: "collapse" }}>
            <tbody>
              {description.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "8px",  fontSize: "16px", border: "1px solid #ddd" }}>{item.title}:</td>
                  <td style={{ padding: "8px", fontSize: "16px", border: "1px solid #ddd" }}>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookPage; 