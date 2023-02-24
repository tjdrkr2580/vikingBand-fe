import { atom } from "recoil";
import { v1 } from "uuid";

export const darkmodeState = atom({
  key: `state${v1()}`,
  default: false,
});

export const isUserState = atom({
  key: `state${v1()}`,
  default: false,
});

