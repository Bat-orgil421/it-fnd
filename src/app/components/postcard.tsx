import { Post } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Heart, MessageCircle, Trash2, X } from "lucide-react";
import { useAxios } from "../hooks/useaxios";
import { useUser } from "../providers/UserProvider";
import Link from "next/link";

dayjs.extend(relativeTime);

export const PostCard = ({ post }: { post: Post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [totalComments, setTotalComments] = useState(0);

  const axios = useAxios();

  const [text, setText] = useState("");
  const [comments, setComments] = useState(post.comments);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const userId = user._id;
      setIsLiked(post.likes.some((like) => like.createdBy._id === userId));
    }
  }, [user]);

  useEffect(() => {
    if (showAllComments) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showAllComments]);

  const handlelike = async () => {
    const response = await axios.post(
      `https://in-bnd.vercel.app/posts/${post._id}/like`
    );
    setIsLiked(response.data.isLiked);

    if (response.data.isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  const handleSubmitComment = async () => {
    const response = await axios.post(
      `https://in-bnd.vercel.app/posts/${post._id}/comments`,
      { text }
    );

    if (response.status === 200) {
      setText("");
      setComments([...comments, response.data]);
    } else {
      toast.error("Алдаа гарлаа");
    }
  };

  const renderUsernameWithBadge = (u: any) => (
    <div className="flex gap-1 items-center"></div>
  );

  return (
    <div key={post._id} className="py-4 border-b border-zinc-800">
      <div className="flex py-2 flex items-center">
        <Link href={`/${post.createdBy.username}`}>
          <div className="font-bold">{post.createdBy.username}・</div>
        </Link>
        <div className="flex items-center text-gray-400 font-medium">
          {dayjs(post.createdAt).fromNow()}
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src={post.imageUrl}
          alt=""
          className="rounded-sm w-118 object-contain border border-neutral-900"
        />
      </div>
      <div className="flex items-center gap-3 py-2">
        <div className="hover:opacity-60 cursor-pointer" onClick={handlelike}>
          {isLiked ? <Heart fill="red" stroke="red" /> : <Heart />}
        </div>
        <div
          className="hover:opacity-60 cursor-pointer"
          onClick={() => setShowAllComments(true)}
        >
          <MessageCircle size={24} />
        </div>
      </div>
      <div className="text-sm font-bold mb-1">{likeCount} likes</div>
      <Link href={`/${post.createdBy.username}`}>
        <b>{post.createdBy.username}</b>
      </Link>{" "}
      {post.description}
      {comments.slice(0, totalComments).map((comment) => (
        <div key={comment._id}>
          <b>{comment.createdBy.username}: </b>
          {comment.text}
        </div>
      ))}
      {comments.length > 1 && (
        <div
          onClick={() => {
            setShowAllComments(true);
          }}
          className="hover:underline cursor-pointer text-neutral-400 text-sm"
        >
          View all {comments.length} comments
        </div>
      )}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full resize-none focus:outline-hidden text-sm placeholder-neutral-400"
          rows={1}
        />
        {text.length > 0 && (
          <div
            onClick={handleSubmitComment}
            className="absolute hover:underline cursor-pointer right-0 top-0 font-bold"
          >
            Post
          </div>
        )}
      </div>
      {showAllComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2">
          <div className="bg-neutral-800 w-full max-w-md md:max-w-4xl h-150 overflow-hidden rounded-lg flex flex-col md:flex-row">
            <div className="w-full md:w-4/5 flex justify-center items-center bg-black">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt="Post image"
                  className="max-h-full w-auto object-contain rounded-lg"
                />
              ) : (
                <div className="text-stone-500 p-4">No image to show</div>
              )}
            </div>

            <div className="md:w-1/2 w-full flex flex-col">
              <div className="flex flex-col overflow-y-auto p-2 space-y-3 max-h-[70vh]">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex gap-2 items-start">
                    <div className="flex flex-col text-stone-300 ">
                      <div className="flex gap-2">
                        <div className="font-bold">{post.createdBy.username}</div>
                        <div>{comment.text}</div>
                      </div>
                      <span className="text-stone-500 text-sm">
                        {dayjs(comment.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-2 py-2">
                <div className="flex items-center gap-3 py-2">
                  <div
                    className="hover:opacity-60 cursor-pointer"
                    onClick={handlelike}
                  >
                    {isLiked ? <Heart fill="red" stroke="red" /> : <Heart />}
                  </div>
                </div>
                <div className="text-sm font-bold mb-1">{likeCount} likes</div>
              </div>
              <div className="px-2 py-2 border-t border-stone-700 flex items-center gap-2">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 resize-none text-sm text-white placeholder-stone-500 focus:outline-none"
                  rows={1}
                />
                {text.length > 0 && (
                  <div
                    onClick={handleSubmitComment}
                    className="text-stone-400 font-semibold text-sm cursor-pointer hover:text-white"
                  >
                    Post
                  </div>
                )}
                <button
                  className="text-stone-400 hover:text-white cursor-pointer"
                  onClick={() => setShowAllComments(false)}
                >
                  <X />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
