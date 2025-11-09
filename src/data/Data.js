import { useEffect, useState } from "react";

export const useData = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("./Data.json");
      const data = await req.json();
      setPosts(data.posts);
    };
    fetchData();
  }, []);

  return posts;
};
