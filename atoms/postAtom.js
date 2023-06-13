import { atom } from "recoil";

export const postState = atom({
  key: "postState",
  default: [],
});

export const searchPostState = atom({
  key: "searchPostState",
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

export const showEmojisState = atom({
  key: "showEmojisState",
  default: false,
});
