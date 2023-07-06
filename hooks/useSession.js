import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

function useSession() {
  const userCookie = getCookie("user");
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);
  const lastedLoginedIn = new Date(user?.time);
  console.log(lastedLoginedIn);
  const now = new Date(Date.now());
  const timeSince = Math.floor(Math.abs(lastedLoginedIn - now) / 36e5);
  const isLessThan10Hours = timeSince > 8;

  useEffect(() => {
    if (userCookie) {
      const res = JSON.parse(userCookie);
      setUser(res);
    }
  }, [userCookie]);

  useEffect(() => {
    const isNoUser = !userCookie || isLessThan10Hours;

    setIsUser(isNoUser);
  }, [user, isLessThan10Hours]);

  const data = isUser
    ? null
    : {
        user: {
          name: user.name,
          email: user.providerUid,
          image: `https://api.dicebear.com/6.x/miniavs/png?seed=${user.name}&backgroundType=gradientLinear&backgroundColor=c0aede,ffd5dc`,
          tag: user.name?.split(" ").join("").toLocaleLowerCase(),
          uid: user.userId,
        },
      };

  // const data = {
  //   user: {
  //     name: "Sujay Rajesh",
  //     email: "sujay.rajesh08@gmail.com",
  //     image: `https://api.dicebear.com/6.x/miniavs/png?seed=${user.name}&backgroundType=gradientLinear&backgroundColor=c0aede,ffd5dc`,
  //     tag: "sujayrajesh",
  //     uid: "22323",
  //   },
  // };
  return { data };
}

export default useSession;
