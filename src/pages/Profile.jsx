import './Profile.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData, saveUserData } from '../Services/userService'; // Import the functions

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newAvatar, setNewAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    
    // Check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);


    // Fetch user data from Firestore
    useEffect(() => {
        if (user) {
            getUserData(user.uid)
                .then((data) => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [user]);


    // Handle edit button click
    const handleEdit = () => {
        setIsEditing(true);
        setNewUsername(userData.username);
        setNewBio(userData.bio);
        setNewAvatar(userData.avatar);
        setAvatarPreview(userData.avatar);
    };

    // Handle avatar change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // Reset preview if no file is selected
            setAvatarPreview(userData.avatar || "path/to/default-avatar.png");
        }
    };
    

    // Handle save button click
    const handleSave = async () => {
        try {
            // Save the data to Firestore
            const userDataToSave = {
                username: newUsername,
                bio: newBio,
                avatar: newAvatar ? newAvatar : userData.avatar, // Only change avatar if new avatar is provided
            };

            await saveUserData(user.uid, userDataToSave); // Pass user id and data to the save function
            setIsEditing(false);
            setUserData(userDataToSave); // Optionally, update the local userData state after saving
        } catch (err) {
            setError('Failed to save profile data');
        }
    };

    // Handle cancel button click
    const handleCancel = () => {
        setIsEditing(false);
        setNewUsername(userData.username);
        setNewBio(userData.bio);
        setNewAvatar(userData.avatar);
        setAvatarPreview(userData.avatar);
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!userData) {
        return <div className="error-message">No user data found</div>;
    }

    // Render the profile page
    return (
        <div className="profile">
            <h1>Profile</h1>
            {userData && (
                <div className="profile-info">
                    <div className="avatar-container">
                    <img 
    src={avatarPreview || userData.avatar || null} 
    alt={userData.username + "'s Avatar"} 
    className="avatar-img" 
/>

                    </div>
                    <h2>{userData.username}</h2>
                    <p>{userData.bio}</p>
                    {isEditing ? (
                        <div className="edit-form">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                value={newBio}
                                onChange={(e) => setNewBio(e.target.value)}
                            ></textarea>
                            <label htmlFor="avatar">Avatar</label>
                            <input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                          {avatarPreview && avatarPreview !== "" ? (<img src={avatarPreview} alt="Preview" className="preview-img" />) : null}
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={handleEdit}>Edit Profile</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;
