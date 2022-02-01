/* eslint-disable react-hooks/rules-of-hooks */
import aspida from "@aspida/fetch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "../api/$api";
import AppHeader from "../components/AppHeader";
import { fetchConfig } from "../src/spotifyFetchConfig";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Container, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";

const spotifyCallback = () => {
  const client = api(aspida(fetch, fetchConfig));
  const router = useRouter();
  const [sideElement, setSideElement] = useState(
    <CircularProgress sx={{ marginRight: "24px" }} />
  );
  const [status, setStatus] = useState("認証中");
  const login = async (token: string) => {
    client.callback
      .$get({ query: { code: token } })
      .then(() => {
        setStatus("認証成功");
        setSideElement(
          <>
            <CheckCircleIcon sx={{ color: "green", marginRight: "24px" }} />
          </>
        );
      })
      .catch(() => {
        setStatus("認証失敗");
        setSideElement(
          <>
            <Link href="#">再認証</Link>
            <CancelIcon sx={{ color: "red", marginRight: "24px" }} />
          </>
        );
      });
  };
  useEffect(() => {
    if (!router.query.code) return;
    console.log(router.query.callback);
    login(router.query.code.toString());
  }, [router.query.code]);
  return (
    <div>
      <AppHeader />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          sx={{
            minWidth: 275,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ padding: 3 }}>{status}</Typography>
          {sideElement}
        </Paper>
        <Button
          variant="contained"
          sx={{ margin: 2 }}
          onClick={() => window.close()}
        >
          閉じる
        </Button>
      </Container>
    </div>
  );
};
export default spotifyCallback;
