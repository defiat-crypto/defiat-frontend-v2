import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

let theme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#8355ff'
    },
    secondary: {
      main: '#f4f5f7'
    },
    success: {
      main: '#00f2c3'
    },
    info: {
      main: '#0091f2'
    },
    background: {
      paper: '#1f2251',
      default: '#171941'
    }
  },
  typography: {
    fontFamily: [
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
