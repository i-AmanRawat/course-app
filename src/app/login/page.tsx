"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { adminState } from "@/store/atoms/admin";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setAdmin = useSetRecoilState(adminState);

  async function onLogin() {
    const payload = {
      username: email,
      password,
    };

    const response = await axios.post("/api/admin/login", payload);

    console.log(response.data);

    setAdmin({
      adminEmail: email,
      isLoading: false,
    });

    router.push("/courses");
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
          Welcome to Coursera. Sign in below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
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
            className="bg-blue-600"
            onClick={onLogin}
          >
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
