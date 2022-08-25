import PropTypes from 'prop-types';
import Image from 'next/image';
import ButtonLink from '../molecules/ButtonLink';
import { Typography, Box } from '@mui/material';

export default function MascotCard({ img, title, text, link, buttonTitle }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center' },
        alignItems: 'center',
        gap: 2,
      }}
      p={2}
    >
      <Image {...img} layout="fixed" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h3"
          pt={1}
          textAlign="center"
          // Affects all MascotCards, regardless of layout and their size.
          sx={{ fontWeight: { md: 'bold' } }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          p={2}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: '450px',
          }}
        >
          {text}
        </Typography>
        {/* Missing aria-label */}
        <ButtonLink to={link} variant="outlined" aria-label="">
          {buttonTitle || 'Learn More'}
        </ButtonLink>
      </Box>
    </Box>
  );
}

const imgShape = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

MascotCard.propTypes = {
  img: PropTypes.shape(imgShape).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  type: PropTypes.string,
};
