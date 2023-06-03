import { ID, storage } from "../appwrite";

const uploadFile = async (file) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(process.env.NEXT_PUBLIC_POST_BUCKET, ID.unique(), file);

  return fileUploaded;
};

export default uploadFile;
