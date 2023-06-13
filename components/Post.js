import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, SwitchHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import useSession from "../lib/useSession";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { commentState, likeState, showEmojisState } from "../atoms/PostAtom";
import useGetState from "../hooks/useGetState";
import deleteLike from "../lib/deleteLike";
import updateAddLike from "../lib/updateAddLike";
import deletePost from "../lib/deletePost";
import createLike from "../lib/createLike";
import Image from "next/image";

function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const comments = useRecoilValue(commentState);
  const likes = useRecoilValue(likeState);
  const showEmojis = useRecoilValue(showEmojisState);
  const [loading, setLoading] = useState(false);

  const { getComments, getLikes } = useGetState({ postId: id });

  const postFoundComments = comments.find((comment) => comment.id === id);
  const postComments = postFoundComments?.doc;

  const postFoundlikes = likes.find((like) => like.id === id);
  const postLikes = postFoundlikes?.doc[0];

  const [liked, setLiked] = useState(false);

  const { getPosts } = useGetState({ postId: "" });

  useEffect(() => {
    getComments();
    getLikes();
  }, [post]);

  useEffect(() => {
    if (postLikes?.users.find((user) => session.user.uid === user)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [postLikes]);

  const likePost = async () => {
    setLoading(true);
    const userId = session.user.uid;

    if (liked) {
      const deletePostLike = await deleteLike(postLikes, userId);
    } else {
      if (postLikes) {
        const addLike = await updateAddLike(postLikes, userId);
      } else {
        const createPostLike = await createLike(userId, id);
      }
    }

    getPosts();
    setLoading(false);
  };

  return (
    <div className={`p-0 px-1 py-5 sm:p-3 flex cursor-pointer bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-3xl ${loading && "animate-pulse pointer-events-none"} ${showEmojis ? "-z-10 " : "z-50"}`} onClick={() => router.push(`/${id}`)}>
      {!postPage && <img src={post?.userImg} alt="" className="h-11 w-11 rounded-full mr-4 sm:inline hidden" />}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && <img src={post?.userImg} alt="" className="h-11 w-11 rounded-full mr-4" />}

          <div className="text-[#6e767d] flex">
            {!postPage && <img src={post?.userImg} alt="" className="h-11 w-11 rounded-full sm:hidden" />}

            <div className="inline-block group w-min md:w-auto sm:flex pt-3">
              <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ml-2 md:w-auto w-max ${!postPage && "inline-block"}`}>{post?.username}</h4>
              <span className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}>@{post?.tag}</span>
            </div>
            <div className="hover:underline text-sm sm:text-[15px] ml-2 flex flex-col justify-center">
              <span>
                • <Moment fromNow>{post?.$createdAt}</Moment>
              </span>
            </div>
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        {postPage && <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">{post?.text}</p>}
        {!postPage && <p className="text-[#d9d9d9] text-[15px] sm:text-base ml-14 sm:ml-2 mt-0">{post?.text}</p>}

        {post?.image && (
          <div className="w-ful min-h-[350px] relative mx-10 mt-3 sm:mx-0">
            <Image src={post?.image} alt="" className="rounded-2xl max-h-[700px] object-cover mr-2" layout="fill" />
          </div>
        )}

        <div className={`text-[#6e767d] flex justify-between w-10/12 ml-10 ${postPage && "mx-auto"}`}>
          <div
            className="flex items-center sm:space-x-1 space-x-0 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {postComments?.length > 0 && <span className="group-hover:text-[#1d9bf0] text-sm">{postComments.length}</span>}
          </div>

          {session.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                setLoading(true);

                deletePost(id, post?.image, postComments, postLikes).then(() => {
                  getPosts();
                  setLoading(false);
                });

                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="flex items-center space-x-0 sm:space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">{liked ? <HeartIconFilled className="h-5 text-pink-600" /> : <HeartIcon className="h-5 group-hover:text-pink-600" />}</div>
            {postLikes?.likeCount > 0 && <span className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"}`}>{postLikes.likeCount}</span>}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
