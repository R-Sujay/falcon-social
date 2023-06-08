import { Query } from "appwrite";
import { databases } from "../appwrite";

async function fetchComments(postId) {
  const fetchComment = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COMMENTS_COLLECTION_ID, [Query.equal("postRef", postId)]);

  return fetchComment;
}

export default fetchComments;
