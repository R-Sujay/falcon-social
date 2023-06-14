function useSession() {
  const name = "Sujay Rajesh";
  const data = {
    user: {
      name: "Sujay Rajesh",
      email: "sujay.rajesh08@gmail.com",
      image: `https://api.dicebear.com/6.x/miniavs/svg?seed=${name}&backgroundType=gradientLinear&backgroundColor=c0aede,ffd5dc`,
      //   tag: session.user.name.split(" ").join("").toLocaleLowerCase();
      tag: "sujayrajesh",
      uid: "109082603788246769448",
    },
  };

  return { data };
}

export default useSession;
