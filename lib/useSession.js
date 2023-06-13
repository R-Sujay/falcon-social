function useSession() {
  const data = {
    user: {
      name: "Sujay Rajesh",
      email: "sujay.rajesh08@gmail.com",
      image: "https://cloud.appwrite.io/v1/storage/buckets/647b67ddea130b90ae40/files/6486f5f08f33fe982e7a/view?project=64732ebfa65167393492&mode=admin",
      //   tag: session.user.name.split(" ").join("").toLocaleLowerCase();
      tag: "sujayrajesh",
      uid: "109082603788246769448",
    },
  };

  return { data };
}

export default useSession;
