import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { CssBaseline, ThemeOptions } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const themeOptions: ThemeOptions = {
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#f2f5f9",
      },
    },
  };
  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  );
}
export default MyApp;
