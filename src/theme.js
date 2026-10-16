import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6579d4',
      light: '#d7d7d7',
    },
    secondary: {
      main: '#42938c',
    },
    direction: {
      balanced: '#d4c065',
      left: '#65b1d4',
      right: '#d46579',
    },
    background: {
      paper: '#282c34',
      default: '#121115',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'default',
      },
    },
    MuiPaper: {
      styleOverrides: {
        // Dark mode adds a lightening gradient to elevated Paper since MUI v5, keep the flat look
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const theme = createTheme(baseTheme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // MUI v5 changed the body font from body2 to body1, keep the original smaller body text
        body: baseTheme.typography.body2,
      },
    },
  },
});

export default theme;
