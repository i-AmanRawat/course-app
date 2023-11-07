"use client";

import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useRecoilValue } from "recoil";
import { adminEmailState } from "@/store/selectors/adminEmail";
import { isAdminLoading } from "@/store/selectors/isAdminLoading";
import { useRouter } from "next/navigation";

export default function Landing() {
  const userEmail = useRecoilValue(adminEmailState);
  const userLoading = useRecoilValue(isAdminLoading);
  const router = useRouter();

  return (
    <div className="flex h-screen justify-center items-center">
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Coursera Admin</Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>
            {!userLoading && !userEmail && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      router.push("/signin");
                    }}
                  >
                    Signin
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div></div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img src={"/class.jpeg"} width={"100%"} alt="home page image" />
        </Grid>
      </Grid>
    </div>
  );
}
