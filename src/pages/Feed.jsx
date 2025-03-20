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
    <div>
      <PostChirp />
      {error ? <p>{error}</p> : (
        chirps.map((chirp) => (
          <div key={chirp.id} className="chirp">
            <h3>{chirp.username || "Anonymous"}</h3>
            <p>{chirp.text}</p>
            <small>{chirp.timestamp ? new Date(chirp.timestamp).toLocaleString() : "Just now"}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
