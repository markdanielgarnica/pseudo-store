import Header from "@/global/Header";
import AppProvider from "@/context/AppProvider";
import { CssBaseline, ThemeProvider, colors, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import ScrollProvider from "@/context/ScrollProvider";

const theme = createTheme({
  palette: {
    text: {
      primary: colors.blueGrey[700],
    },
    primary: {
      main: colors.blueGrey[700],
    },
    secondary: {
      main: colors.blueGrey[50],
    },
    action: {
      hover: colors.blueGrey[900],
    },
    background: {
      default: colors.grey[100],
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif", // set your default font here
    fontSize: 15,
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 35,
    },
    h3: {
      fontSize: 30,
    },
    h4: {
      fontSize: 25,
    },
    h5: {
      fontSize: 20,
    },
    h6: {
      fontSize: 13,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Apply styles to the root of the application
        "*": {
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
        },
        input: {
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>PseudoShop</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/image/favicon.ico" />
        </Head>
        <CssBaseline />
        <AppProvider>
          <ScrollProvider>
            <Header />
            <Component {...pageProps} />
          </ScrollProvider>
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
