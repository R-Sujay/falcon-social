import { ID, databases } from "../appwrite";

const addPost = async (post) => {
  if (!post) return;

  const createPost = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, ID.unique(), post);

  return createPost;
};

export default addPost;
