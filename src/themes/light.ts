import { extendTheme, theme as nbTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.tertiary,
  },
  config: {
    initialColorMode: "light",
  },
});

export default theme;
