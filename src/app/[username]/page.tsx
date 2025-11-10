"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useaxios";
import { Post, User } from "../types";
import { useUser } from "../providers/UserProvider";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { AxiosError } from "axios";

const Page = () => {
  const { username } = useParams();
  const [usere, setUsere] = useState<User | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isfollow, setIsFollow] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const axios = useAxios();
  const { user: currentUser } = useUser();



  useEffect(() => {
    axios
      .get(`/users/${username}`)
      .then((res) => {
        setUsere(res.data);
      })
      .catch((res) => {
        if (res.status === 404) {
          setIsNotFound(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <>Loading...</>;
  if (isNotFound) return <>User with username {username} not found!</>;
  const isOwnProfile = currentUser?.username === usere?.username;

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="w-120 h-45  flex flex-row items-center justify-around">
            <div>
              <div className="w-35 h-35 bg-white rounded-full"></div>
            </div>
            <div className="">
              <div className="text-2xl font-bold py-3 flex flex-col">
                {username}
                <div className="text-sm font-medium">{usere?.fullname}</div>
              </div>
              <div className="flex flex-row justify-between w-70 text-xs font-medium">
                <div>{posts.length} posts</div>
                <div>followers</div>
                <div>following</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mb-6 ">
          <div className="w-120 h-40">
            {isOwnProfile ? (
              <Link
                href="/edit/profile"
                className="mt-2 px-4 py-2 rounded-xl bg-[#262626] text-white hover:bg-[#363636] transition"
              >
                Edit Profile
              </Link>
            ) : (
              <>
                <button
                  onClick={async () => {
                    const response = await axios.post(
                      `https://in-bnd.vercel.app/users/${usere?.username}/follow`
                    );
                  }}
                  className={`rounded-sm font-semibold cursor-pointer ${
                    isfollow
                      ? "bg-zinc-800 w-50 h-10"
                      : "bg-indigo-600 w-50 h-10"
                  }`}
                >
                  {isfollow ? "Following" : "Follow"}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-8 px-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 justify-center">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="relative rounded-xl overflow-hidden group border-3 border-stone-600 hover:border-white cursor-pointer w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px]"
                  onClick={() => setSelectedPost(post)}
                >
                  <img
                    src={post.imageUrl}
                    alt="Post image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5 fill-white" />
                      <span className="text-sm font-semibold">
                        {post.likes?.length ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span className="text-sm font-semibold">
                        {post.comments?.length ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-stone-500 mt-10">
                No posts yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
