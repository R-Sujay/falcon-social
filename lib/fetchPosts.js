import { Query } from "appwrite";
import { databases } from "../appwrite";

async function fetchPosts() {
  const fetchPost = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, [Query.limit(100)]);

  return fetchPost;
}

export default fetchPosts;
