"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useaxios";
import { Post, User } from "../types";
import { useUser } from "../providers/UserProvider";

const Page = ({ post }: { post: Post }) => {
  const { username } = useParams();
  const [usere, setUsere] = useState<User | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isfollow, setIsFollow] = useState(false);
  const axios = useAxios();
  const { user } = useUser();

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
                <div className="text-sm font-medium"></div>
              </div>
              <div className="flex flex-row justify-between w-70 text-xs font-medium">
                <div>posts</div>
                <div>followers</div>
                <div>following</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" w-120 h-40">
            <div
              className="flex items-center justify-center rounded-lg bg-zinc-800 w-50 h-10 font-bold text-sm cursor-pointer hover:bg-zinc-700"
              onClick={async () => {
                const response = await axios.post(
                  `/users/${user?.username}/follow`
                );
              }}
            >
              {isfollow ? "Following" : "Follow"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
