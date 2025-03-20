import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

import PostChirp from '../components/PostChirp';

const Feed = () => {
  const [chirps, setChirps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChirps = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'chirps'));
        const chirpsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Optional: Sort chirps by timestamp (if available)
        chirpsData.sort((a, b) => b.timestamp - a.timestamp);

        setChirps(chirpsData);
      } catch (error) {
        setError("Error fetching chirps: " + error.message);
      }
    };
    fetchChirps();
  }, []);

  return (
    <div className="feed-wrapper">
      <PostChirp />
      {error ? <p className="error-message">{error}</p> : (
        chirps.map((chirp) => (
          <div key={chirp.id} className="chirp-item">
            <h3 className="chirp-user">{chirp.username || "Anonymous"}</h3>
            <p className="chirp-text">{chirp.text}</p>
            <small className="chirp-timestamp">{chirp.timestamp ? new Date(chirp.timestamp).toLocaleString() : "Just now"}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
