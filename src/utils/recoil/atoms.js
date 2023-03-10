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

export const userDetailInfo = atom({
  key: `state${v1()}`,
  default: undefined,
});

export const tokenState = atom({
  key: `state${v1()}`,
  default: undefined,
});

export const filter = atom({
  key: `state${v1()}`,
  default: "최신 순",
});
