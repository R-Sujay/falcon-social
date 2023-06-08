import { ID, databases } from "../appwrite";

const addComment = async (comment) => {
  if (!comment) return;

  const createComment = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COMMENTS_COLLECTION_ID, ID.unique(), comment);

  return createComment;
};

export default addComment;
