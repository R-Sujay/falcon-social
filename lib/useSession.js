function useSession() {
  const data = {
    user: {
      name: "Sujay Rajesh",
      email: "sujay.rajesh08@gmail.com",
      image: "https://lh3.googleusercontent.com/a/AAcHTtcsthRBqku81BYIL90jRMkJ8NeULdwHhji2m-kHXw=s83-c-mo",
      //   tag: session.user.name.split(" ").join("").toLocaleLowerCase();
      tag: "sujayrajesh",
      uid: "109082603788246769448",
    },
  };

  return { data };
}

export default useSession;
