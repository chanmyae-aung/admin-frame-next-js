import { Colors, ProjectType } from "@/types/theme";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    projectTheme: ProjectType;
    colors: Colors;
  }

  interface ThemeOptions {
    projectTheme: ProjectType;
    colors: Colors;
  }
}

const theme = createTheme({
  projectTheme: {
    name: "Admin Panel",
    drawerWidth: 240,
    version: "0.0.1"
  },
  colors: {
    primary: "",
    secondary: "",
    text: "",
    white: "#ffffff",
    black: "#000000",
    gray: {
      100: "#FBFBFB"
    }
  },
  palette: {
    mode: "light"
  },
  typography: {
    fontFamily: "",
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {}
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "0 !important"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          minWidth: "100px",
          height: "37px"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& fieldset": {}
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paperWidthMd: {
          maxWidth: "380px",
          width: "100%"
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingBottom: "25px"
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          width: "120px"
        }
      }
    }
  }
});

export default theme;
