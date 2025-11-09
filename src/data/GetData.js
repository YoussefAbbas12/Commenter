import { useEffect, useState } from "react";

export const useData = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("http://localhost:5000/api/data");
      const data = await req.json();
      setPosts(data.posts);
    };
    fetchData();
  }, []);

  return posts;
};
