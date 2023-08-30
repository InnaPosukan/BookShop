import React, { useState, useEffect } from 'react';
import "./Rating.css";
import { sendRating } from '../../http/bookApi';

const Rating = ({ bookId, userId }) => {
    const [selectedValue, setSelectedValue] = useState(0);
    const [error, setError] = useState(null);
    const [hasRated, setHasRated] = useState(false); 
    
    useEffect(() => {
        const hasRatedBook = localStorage.getItem(`rated_${bookId}_${userId}`);
        if (hasRatedBook) {
            setHasRated(true);
            const userRating = parseInt(localStorage.getItem(`rating_${bookId}_${userId}`), 10);
            setSelectedValue(userRating);
        }
    }, [bookId, userId]);

    const handleRatingClick = async (itemValue) => {
        if (userId && !hasRated) {
            try {
                console.log("Clicked rating item:", itemValue);
                setSelectedValue(itemValue);
                await sendRatingToServer(itemValue);
                console.log("Rating sent successfully:", itemValue);
                localStorage.setItem(`rated_${bookId}_${userId}`, true);
                localStorage.setItem(`rating_${bookId}_${userId}`, itemValue); 
                setHasRated(true);
            } catch (error) {
                setError("Error sending rating");
            }
        } else {
            console.log("User has already rated this book or is not logged in.");
        }
    };

    const sendRatingToServer = async (itemValue) => {
        try {
            console.log("Sending rating to server:", itemValue);
            console.log("userId:", userId);
            console.log("bookId:", bookId);
            await sendRating(bookId, itemValue, userId);
        } catch (error) {
            throw new Error("Error sending rating");
        }
    };

    return (
        userId && (
            <div className="rating-container">
                <p className="rating-text" style={{ fontSize: '15px', marginTop:'12px' }}></p>
                <div className="rating" data-total-value={selectedValue}>
                    <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="5" onClick={() => handleRatingClick(5)}>★</div>
                    <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="4" onClick={() => handleRatingClick(4)}>★</div>
                    <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="3" onClick={() => handleRatingClick(3)}>★</div>
                    <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="2" onClick={() => handleRatingClick(2)}>★</div>
                    <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="1" onClick={() => handleRatingClick(1)}>★</div>
                </div>
            </div>
        )
    );
};

export default Rating;





