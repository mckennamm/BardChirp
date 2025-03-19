import { useEffect, useState } from "react";
import { db } from "./firebase";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h3>{post.username}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
