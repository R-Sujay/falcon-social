import { ID, databases } from "../appwrite";

// const deleteLike = async (id, sessionUID) => {
const deleteLike = async (post, sessionUID) => {
  if (!post) return;

  const userSplice = post.users.filter((user) => user !== sessionUID);
  const likeFind = post.likeCount;

  const data = {
    likeCount: likeFind - 1,
    users: userSplice,
  };

  const deleteLike = await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_LIKES_COLLECTION_ID, post.$id, data);

  return deleteLike;
};

export default deleteLike;
