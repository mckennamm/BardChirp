import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase'; // Import Firebase Auth

function PostChirp() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newChirp, setNewChirp] = useState('');

    // Toggle visibility of input form
    const handleClick = () => setIsFormVisible(!isFormVisible);

    // Handle input change
    const handleInputChange = (event) => setNewChirp(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Chirp submitted:', newChirp);

        if (!newChirp.trim()) return; // Prevent empty chirps

        // Get the current user
        const user = auth.currentUser;

        if (user) {
            try {
                // Add chirp to Firestore with userId (using the user's UID as a string)
                await addDoc(collection(db, "chirps"), {
                    text: newChirp,
                    createdAt: new Date(),
                    userId: user.uid, // Store the user's UID as a string
                    username: user.displayName || 'Shrouded Figure', // Use display name or default to 'Anonymous'
                });

                console.log("Chirp successfully added to firestore!");
            } catch (error) {
                console.error("Error adding chirp:", error);
            }

            // Clear input field and hide the form
            setNewChirp("");
            setIsFormVisible(false);
        } else {
            console.error("User is not logged in.");
        }
    };

    return (
        <div className="post-chirp">
            <button onClick={handleClick}>
                {isFormVisible ? "Cancel" : "Chirp Here"}
            </button>

            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={newChirp}
                        onChange={handleInputChange}
                        placeholder="Bird's the word..."
                        rows="4"
                        cols="50"
                    />
                    <button type="submit">Chirp</button>
                </form>
            )}
        </div>
    );
}

export default PostChirp;
