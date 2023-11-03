import { atom } from "recoil";

type AdminState = {
  isLoading: boolean;
  adminEmail: string | null;
};

export const adminState = atom<AdminState>({
  key: "adminState",
  default: {
    isLoading: true,
    adminEmail: null,
  },
});
