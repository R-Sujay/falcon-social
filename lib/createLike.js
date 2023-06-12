import { ID, databases } from "../appwrite";

const createLike = async (userId, id) => {
  if (!userId) return;

  const like = {
    users: [userId],
    likeCount: 1,
    postRef: id,
  };

  const createlike = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_LIKES_COLLECTION_ID, ID.unique(), like);

  return createlike;
};

export default createLike;
