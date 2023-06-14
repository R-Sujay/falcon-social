import { atom } from "recoil";
import { items } from "../constants/headerItems";

export const itemSelectedAtom = atom({
  key: "itemSelectedAtom",
  default: items[0].id,
});
