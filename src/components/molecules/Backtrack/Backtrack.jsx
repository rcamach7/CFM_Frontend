import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import theme from 'theme';
import { ArrowBack } from '@mui/icons-material';

const INITIAL_HISTORY_LENGTH = 2;

export default function Backtrack() {
  const router = useRouter();
  const { asPath } = useRouter();

  const prevLocation =
    asPath.includes('update') || asPath.includes('checkin') ? 'Fridge' : 'Map';

  const onBack = () => {
    if (window.history.length > INITIAL_HISTORY_LENGTH) {
      router.back();
    }
  };

  return (
    <Box>
      <Container
        fixed
        disableGutters
        maxWidth={false}
        onClick={() => onBack()}
        sx={{
          minWidth: '100%',
          height: '54px',
          paddingLeft: '17px',
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.text.secondary,
          ':hover': { cursor: 'pointer' },
        }}
      >
        <ArrowBack fontSize="medium" />
        <Typography
          sx={{
            fontSize: '15px',
          }}
        >
          {`Back to ${prevLocation}`}
        </Typography>
      </Container>
    </Box>
  );
}
