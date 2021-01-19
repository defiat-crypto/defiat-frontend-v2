import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

let theme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: "#ba84ff",
      main: "#8355ff",
      dark: "#4927cb",
      contrastText: "#fff"
    },
    secondary: {
      light: "#66c1ff",
      main: "#0091f2",
      dark: "#0064bf",
      contrastText: "#fff"
    },
    success: {
      light: "#6afff6",
      main: "#00f2c3",
      dark: "#00be93",
      contrastText: "#fff"
    },
    background: {
      paper: "#121212",//"#424242",
      default: "#000", //"#303030"
    }
  },
  typography: {
    fontFamily: [
      '"Poppins"',
      '"Montserrat"',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif'
    ].join(','),
    // fontSize: 14,
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,
    // fontWeightBold: 700,
    // h5: {
    //   fontFamily: ['"Roboto"', '"Helvetica"', '"Arial"', 'sans-serif'].join(','),
    //   // fontWeight: 400,
    //   // fontSize: "2.125rem",
    //   // lineHeight: 1.235,
    //   // letterSpacing: "0.00735em",
    // },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
