import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { designColor, default as palette } from './palette';
import typography from './typography';

const theme = responsiveFontSizes(
  createTheme({
    palette,
    typography,
    spacing: 4,
    props: {
      MuiAppBar: {
        color: designColor.blue.light,
      },
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: 'secondary',
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 45,
            '&:hover': {
              borderColor: designColor.blue.dark,
            },
            '&.MuiButton-outlined': {
              color: designColor.grayscale.gradient[5],
              borderColor: designColor.blue.dark,
            },
            '&.Mui-disabled': {
              color: designColor.grayscale.gradient[0],
              backgroundColor: designColor.grayscale.gradient[4],
            },
          },
        },
      },
    },
  })
);

export default theme;
