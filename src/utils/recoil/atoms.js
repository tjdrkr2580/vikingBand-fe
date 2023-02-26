import { atom } from "recoil";
import { v1 } from "uuid";

export const darkmodeState = atom({
  key: `state${v1()}`,
  default: true,
});

export const isUserState = atom({
  key: `state${v1()}`,
  default: false,
});

export const isModalState = atom({
  key: `state${v1()}`,
  default: false,
});

export const userInfoState = atom({
  key: `state${v1()}`,
  default: undefined,
});

export const studyModalState = atom({
  key: `state${v1()}`,
  default: false,
});
