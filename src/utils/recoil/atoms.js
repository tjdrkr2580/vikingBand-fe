import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { v1 } from "uuid";

const { persistAtom } = recoilPersist({
  key: `vDark`,
  storage: localStorage,
});

export const darkmodeState = atom({
  key: `vDark`,
  default: true,
  effects_UNSTABLE: [persistAtom],
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
