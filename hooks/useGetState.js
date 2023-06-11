import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { commentState, likeState, postState, refreshState } from "../atoms/PostAtom";
import { debounce } from "lodash";
import fetchPosts from "../lib/fetchPosts";
import fetchComments from "../lib/fetchComments";
import fetchLikes from "../lib/fetchLikes";

function useGetState({ postId, refresh }) {
  const [post, setPost] = useRecoilState(postState);
  const [comments, setComments] = useRecoilState(commentState);
  const [likes, setLikes] = useRecoilState(likeState);

  const getPosts = useCallback(
    debounce(async (q) => {
      fetchPosts().then((res) => {
        setPost(res.documents);
      });
    }, 100),
    []
  );

  const getComments = useCallback(
    debounce(async (q) => {
      if (postId) {
        fetchComments(postId).then((res) => {
          if (!comments.find((comment) => comment.id === res.documents.forEach((com) => com.$id))) {
            if (res.documents.find((comment) => comment.postRef === postId)) {
              setComments((exisitngComments) => [{ doc: res.documents, id: postId }, ...exisitngComments]);
            }
          }
        });
      }
    }, 100),
    []
  );

  const getLikes = useCallback(
    debounce(async (q) => {
      if (postId) {
        fetchLikes(postId).then((res) => {
          if (!likes.find((like) => like.id === res.documents.forEach((lik) => lik.$id))) {
            if (res.documents.find((like) => like.postRef === postId)) {
              setLikes((exisitngLikes) => [{ doc: res.documents, id: postId }, ...exisitngLikes]);
            }
          }
        });
      }
    }, 100),
    []
  );

  return { getPosts, getComments, getLikes };
}

export default useGetState;