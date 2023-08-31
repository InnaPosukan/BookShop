import React, { useState, useEffect } from 'react';
import "./Rating.css";
import { sendRating } from '../../http/bookApi';

const Rating = ({ bookId, userId }) => {
    const [selectedValue, setSelectedValue] = useState(0);
    const [error, setError] = useState(null);
    const [hasRated, setHasRated] = useState(false);
    const [numberOfVotes, setNumberOfVotes] = useState(0);

    useEffect(() => {
        const hasRatedBook = localStorage.getItem(`rated_${bookId}_${userId}`);
        if (hasRatedBook) {
            setHasRated(true);
            const userRating = parseInt(localStorage.getItem(`rating_${bookId}_${userId}`), 10);
            setSelectedValue(userRating);
        }
        const usersWhoRated = Object.keys(localStorage).filter(key => key.startsWith(`rated_${bookId}_`)).length;
        setNumberOfVotes(usersWhoRated);
    }, [bookId, userId]);

    const handleRatingClick = async (itemValue) => {
        if (userId && !hasRated) {
            try {
                setSelectedValue(itemValue);
                await sendRatingToServer(itemValue);
                localStorage.setItem(`rated_${bookId}_${userId}`, true);
                localStorage.setItem(`rating_${bookId}_${userId}`, itemValue);
                setHasRated(true);
                setNumberOfVotes(prevVotes => prevVotes + 1);
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
                    <div className="rating" data-total-value={selectedValue}>
                        <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="5" onClick={() => handleRatingClick(5)}>★</div>
                        <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="4" onClick={() => handleRatingClick(4)}>★</div>
                        <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="3" onClick={() => handleRatingClick(3)}>★</div>
                        <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="2" onClick={() => handleRatingClick(2)}>★</div>
                        <div className={`rating__item ${hasRated ? 'disabled' : ''}`} data-item-value="1" onClick={() => handleRatingClick(1)}>★</div>
                    </div>
                    <p className={`vote-count ${numberOfVotes >= 0 ? 'visible' : ''}`}>
                        {numberOfVotes} {numberOfVotes === 1 ? 'vote' : 'votes'}
                    </p>
                </div>
            )
        );
        
};

export default Rating;





