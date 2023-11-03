import { adminState } from "../atoms/admin";
import { selector } from "recoil";

export const userEmailState = selector({
  key: "userEmailState",
  get: ({ get }) => {
    const state = get(adminState);

    return state.adminEmail;
  },
});
