function useSession() {
  const data = {
    user: {
      name: "Sujay Rajesh",
      email: "sujay.rajesh08@gmail.com",
      image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fcloud.appwrite.io%2Fv1%2Fstorage%2Fbuckets%2F647b67ddea130b90ae40%2Ffiles%2F6488a3c23450f125eeed%2Fview%3Fproject%3D64732ebfa65167393492&w=1920&q=75",
      //   tag: session.user.name.split(" ").join("").toLocaleLowerCase();
      tag: "sujayrajesh",
      uid: "109082603788246769448",
    },
  };

  return { data };
}

export default useSession;
