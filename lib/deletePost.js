import { databases, storage } from "../appwrite";

const deletePost = async (id, image, comments, like) => {
  if (!id) return;

  const deletePost = await databases.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, id);

  if (comments) {
    const deleteComments = comments.forEach(async (comment) => {
      const deleteReq = await databases.deleteDocument(comment.$databaseId, comment.$collectionId, comment.$id);
    });
  }

  if (like) {
    const deleteLikes = await databases.deleteDocument(like.$databaseId, like.$collectionId, like.$id);
  }

  if (image) {
    const splitUrl = image.split("https://cloud.appwrite.io/v1/storage/buckets/");
    const mainId = splitUrl[1];
    const splitId = mainId.split("/files/");

    const bucketId = splitId[0];
    const fileId = splitId[1].split("/view?project=")[0];

    const deleteImage = await storage.deleteFile(bucketId, fileId);
  }

  return deletePost;
};

export default deletePost;
