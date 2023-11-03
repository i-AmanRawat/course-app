import { adminState } from "../atoms/admin";
import { selector } from "recoil";

export const isUserLoading = selector({
  key: "userLoadingState",
  get: ({ get }) => {
    const state = get(adminState);

    return state.isLoading;
  },
});