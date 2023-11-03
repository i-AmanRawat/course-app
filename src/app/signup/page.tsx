"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { adminState } from "@/store/atoms/admin";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setUser = useSetRecoilState(adminState);

  async function onSignup() {
    try {
      console.log("before making req");

      const payload = { username: email, password: password };

      console.log(payload);

      const response = await axios.get("/api/admin/signup");
      console.log("req made from frontend");
      console.log(response);
      setUser({ adminEmail: email, isLoading: false });
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />

          <Button
            size={"large"}
            variant="contained"
            className=" bg-blue-600"
            onClick={onSignup}
          >
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
