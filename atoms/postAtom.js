import { atom } from "recoil";

export const postState = atom({
  key: "postState",
  default: [],
});

export const likeState = atom({
  key: "likeState",
  default: [],
});

export const commentState = atom({
  key: "commentState",
  default: [],
});
