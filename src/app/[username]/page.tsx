"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useaxios";
import { Post, User } from "../types";
import Image from "next/image";
import { useUser } from "../providers/UserProvider";
import Link from "next/link";

const Page = ({ post }: { post: Post }) => {
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
                <div>posts</div>
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
                      `/users/${usere?.username}/follow`
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
        
      </div>
    </>
  );
};

export default Page;
