import { extendTheme, theme as nbTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.success,
  },
  config: {
    initialColorMode: "light",
  },
});

export default theme;
