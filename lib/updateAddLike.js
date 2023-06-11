import { ID, databases } from "../appwrite";

const updateAddLike = async (post, sessionUID) => {
  if (!post) return;

  const likedUsers = [];

  let i = -1;
  while (++i < post.users.length) {
    likedUsers[i] = post.users[i];
  }
  const userAddedArray = likedUsers.push(sessionUID);

  const likeFind = post.likeCount;

  const data = {
    likeCount: likeFind + 1,
    users: likedUsers,
  };

  const addLike = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_LIKES_COLLECTION_ID,
    post.$id,
    data
  );

  return addLike;
};

export default updateAddLike;
