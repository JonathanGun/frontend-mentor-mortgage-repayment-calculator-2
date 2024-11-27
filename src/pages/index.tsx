import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import MainPage from "./main";
import { indigo, lime } from "@mui/material/colors";
import "../styles/global.css";

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: lime,
      secondary: indigo,
    },
    typography: {
      fontFamily: "Plus Jakarta Sans",
    },
  });

  const amount = parseFloat(
    new URLSearchParams(location.search).get("amount") ?? ""
  );
  const terms = parseInt(
    new URLSearchParams(location.search).get("terms") ?? ""
  );
  const rate = parseFloat(
    new URLSearchParams(location.search).get("rate") ?? ""
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainPage _amount={amount} _terms={terms} _rate={rate} />
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Frontend Mentor | Mortgage Repayment Calculator</title>
);
