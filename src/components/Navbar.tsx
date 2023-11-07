"use client";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { adminState } from "@/store/atoms/admin";
import { adminEmailState } from "@/store/selectors/adminEmail";
import axios from "axios";

function Navbar() {
  const router = useRouter();
  const adminEmail = useRecoilValue(adminEmailState);
  const setAdmin = useSetRecoilState(adminState);

  if (adminEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  router.push("/addcourse");
                }}
              >
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  router.push("/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              variant={"contained"}
              className="bg-blue-500"
              onClick={async () => {
                const response = await axios.get("/api/admin/logout");
                console.log(response);

                setAdmin({
                  isLoading: false,
                  adminEmail: null,
                });

                router.push("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              className="bg-blue-500"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              className="bg-blue-500"
              onClick={() => {
                router.push("/login");
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
