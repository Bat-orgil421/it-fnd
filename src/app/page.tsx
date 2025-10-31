"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./providers/UserProvider";
import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { Post } from "./types";
import { PostCard } from "./components/postcard";
import { Instagram, InstagramIcon, Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3100/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  if (loading) {
    return <>Loading....</>;
  }

  if (!user) {
    return redirect("/signin");
  }

  return (
    <div className="flex flex-row ">
      <div className="fixed top-0 left-0 w-[73] h-screen bg-black flex flex-row justify-center border-r-1 border-neutral-800">
        <div className="mt-9 mb-9 ">
          <InstagramIcon size={24} />
          <Link href={"/create"}>
            <Plus size={24} className="mt-8" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row mx-auto">
        <div className="w-[470px] flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
