import { Query } from "appwrite";
import { databases } from "../appwrite";

async function fetchLikes(postId) {
  const fetchLike = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_LIKES_COLLECTION_ID, [Query.equal("postRef", postId)]);

  return fetchLike;
}

export default fetchLikes;
