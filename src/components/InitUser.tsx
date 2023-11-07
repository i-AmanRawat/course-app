"use client";

import axios from "axios";
import { useSetRecoilState } from "recoil";
import { adminState } from "@/store/atoms/admin";
import { useEffect } from "react";

function InitUser() {
  const setUser = useSetRecoilState(adminState);
  const init = async () => {
    try {
      const response = await axios.get("/api/admin/me");

      if (response.data.username) {
        setUser({
          isLoading: false,
          adminEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          adminEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        adminEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default InitUser;
